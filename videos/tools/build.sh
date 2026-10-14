#!/usr/bin/env bash
# Baut einen nahtlosen Loop aus Clip-Stücken.
# Aufruf: build.sh out.mp4 stück [stück ...]
#   stück = datei:startFrame:endFrame[:r[:tempo[:x]]]
#     endFrame exklusiv; "r" = rückwärts abspielen ("-" = vorwärts);
#     tempo = Abspielgeschwindigkeit des Stücks (Standard 1, 2 = doppelt so schnell);
#     "x" = 3-Frame-Überblendung vom vorigen Stück statt hartem Schnitt
BIN="${FFMPEG_BIN:-$(dirname "$(command -v ffmpeg)")}"   # Ordner mit ffmpeg/ffprobe (oder FFMPEG_BIN setzen)
XF=3   # Länge der Überblendung in Frames
out="$1"; shift
inputs=(); fc=""; i=0; cur=""; total=0
for p in "$@"; do
  IFS=: read -r file s e rev speed xf <<<"$p"
  speed="${speed:-1}"
  inputs+=(-i "$file")
  chain="[$i:v]trim=start_frame=$s:end_frame=$e,setpts=PTS-STARTPTS"
  [ "$rev" = "r" ] && chain="$chain,reverse"
  fc="$fc$chain,setpts=(PTS-STARTPTS)/$speed,fps=24,settb=1/24[p$i];"
  n=$(awk -v a="$s" -v b="$e" -v sp="$speed" 'BEGIN{printf "%d", (b-a)/sp + 0.5}')
  if [ -z "$cur" ]; then
    cur="p$i"; total=$n
  elif [ "$xf" = "x" ]; then
    off=$(awk -v t="$total" -v x="$XF" 'BEGIN{printf "%.4f", (t-x)/24}')
    fc="$fc[$cur][p$i]xfade=transition=fade:duration=$(awk -v x="$XF" 'BEGIN{printf "%.4f", x/24}'):offset=$off,settb=1/24[c$i];"
    cur="c$i"; total=$((total + n - XF))
  else
    fc="$fc[$cur][p$i]concat=n=2:v=1:a=0,settb=1/24[c$i];"
    cur="c$i"; total=$((total + n))
  fi
  i=$((i+1))
done
fc="${fc}[$cur]scale=720:1280,format=yuv420p[v]"
"$BIN/ffmpeg" -v error -y "${inputs[@]}" -filter_complex "$fc" -map "[v]" -an -c:v libx264 -crf 24 -preset slow -movflags +faststart "$out" || exit 1
"$BIN/ffprobe" -v error -show_entries format=duration,size -of csv=p=0 "$out"
