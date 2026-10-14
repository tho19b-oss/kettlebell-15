#!/usr/bin/env bash
# Gibt die Bewegungsenergie pro Frame aus (mittlere Differenz zum Vorframe) sowie
# den ersten/letzten Frame über einer Schwelle. Aufruf: motion.sh clip.mp4 [schwelle]
BIN="${FFMPEG_BIN:-$(dirname "$(command -v ffmpeg)")}"   # Ordner mit ffmpeg/ffprobe (oder FFMPEG_BIN setzen)
f="$1"; th="${2:-1.0}"
"$BIN/ffmpeg" -v error -i "$f" -vf "scale=180:-1,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null - \
 | awk -v th="$th" '
   /^frame:/ { split($1,a,":"); fr=a[2]+1 }   # tblend-Frame n = Differenz zwischen Frame n und n+1
   /YAVG=/   { split($0,b,"="); v=b[2]+0; vals[fr]=v; if (v>th) { if (first=="") first=fr; last=fr } n=fr }
   END {
     line=""; for (i=1;i<=n;i++) { line=line sprintf("%d:%.1f ", i, vals[i]) }
     print line
     printf "frames=%d first_motion=%s last_motion=%s (t=%.2fs..%.2fs)\n", n+1, first, last, first/24, last/24
   }'
