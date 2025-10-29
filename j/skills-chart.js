// Datos (nombre, nivel, score)
    const items = [
      { name: "Web development", level: "Advanced", score: 5828, icon: "i/skills/web-development.svg", color: "#4C8BF5" },
      { name: "JavaScript", level: "Advanced", score: 3741, icon: "i/skills/javascript.svg", color: "#F7DF1E" },
      { name: "Web Design", level: "Advanced", score: 2645, icon: "i/skills/web-design.svg", color: "#FF8A65" },
      { name: "Computer Science", level: "Beginner", score: 2616, icon: "i/skills/computer-science.svg", color: "#8BC34A" },
      { name: "HTML & CSS", level: "Intermediate", score: 1982, icon: "i/skills/html-css.svg", color: "#6C75FF" }
    ];

    // preparar arrays para Chart.js
    const names = items.map(i => i.name);
    const scores = items.map(i => i.score);
    const colors = items.map(i => i.color);
    const levels = items.map(i => i.level);
    const iconPaths = items.map(i => i.icon);

    // cargar imágenes SVG locales y luego inicializar la gráfica
    function loadIcons(paths, cb) {
      const imgs = [];
      let loaded = 0;
      paths.forEach((p, i) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          if (loaded === paths.length) cb(imgs);
        };
        img.onerror = () => {
          // en caso de error, crear un placeholder canvas icon
          const placeholder = document.createElement('canvas');
          placeholder.width = 24; placeholder.height = 24;
          const ctxp = placeholder.getContext('2d');
          ctxp.fillStyle = '#ccc';
          ctxp.fillRect(0,0,24,24);
          imgs[i] = placeholder;
          loaded++;
          if (loaded === paths.length) cb(imgs);
        };
        img.src = p;
        imgs[i] = img;
      });
    }

    Chart.register(ChartDataLabels);

    loadIcons(iconPaths, (icons) => {
      const ctx = document.getElementById('skillsChart').getContext('2d');

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: names, // usados internamente; no mostrados en eje Y
          datasets: [{
            data: scores,
            backgroundColor: scores.map(() => '#ffffff'),
            borderColor: scores.map(() => '#000000'),
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
            barThickness: 24,
            maxBarThickness: 48
          }]
        },
        options: {
          indexAxis: 'y', // barras horizontales
          responsive: true, // canvas con tamaño fijo
          maintainAspectRatio: false,
          layout: { padding: { left: 30, right: 20, top: 8, bottom: 8 } }, // espacio para iconos
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback: v => Number(v).toLocaleString(),
                callback: function(value) {
                  // Formato en miles: 1k, 2k, 2.6k (solo un decimal si hace falta)
                  if (typeof value !== 'number') return value;
                  if (value >= 1000) {
                    const k = value / 1000;
                    // Mostrar sin decimales si es entero (e.g. 2k), con 1 decimal si no (e.g. 2.6k)
                    return (Math.abs(Math.round(k) - k) < 1e-9) ? Math.round(k) + 'k' : k.toFixed(1).replace(/\.0$/, '') + 'k';
                  }
                  return String(value);
                },
                color: '#00',
                font: { family: 'monospace' }
              },
              border: { display: false },
              grid: { display: true },
              title: { 
                display: true, 
                text: 'Skill scores by codecademy.com', 
                font: { family: 'monospace' }
              }
            },
            y: {
              // no mostrar nombres en eje Y
              ticks: { display: false },
              border: { display: false },
              grid: { display: false }
            }
          },
          plugins: {
            legend: { display: false },
            title: { display: false, text: 'Skills' },
            datalabels: {
              // nombre dentro de la barra, centrado verticalmente y alineado a la izquierda
              color: '#000',
              anchor: 'center',
              align: 'center',
              offset: 12,
              formatter: (value, ctx) => names[ctx.dataIndex],
              font: { family: 'monospace', weight: '400', size: 12 }
            },
            tooltip: {
              titleFont: { family: 'monospace', weight: '400', size: 12 },
              bodyFont: { family: 'monospace', weight: '100', size: 16 },
              enabled: true,
              callbacks: {
                // mostrar nivel y puntaje en el tooltip
                title: (itemsTooltip) => {
                  const idx = itemsTooltip[0].dataIndex;
                  return names[idx];
                },
                label: (ctx) => {
                  const idx = ctx.dataIndex;
                  return levels[idx] + ' — ' + Number(scores[idx]).toLocaleString();
                },
                // colorear el recuadro del tooltip según el nivel
                labelColor: (ctx) => {
                  const idx = ctx.dataIndex;
                  const lvl = levels[idx];
                  const map = {
                    'Advanced': '#33FF33',
                    'Intermediate': '#00CC00',
                    'Beginner': '#006600'
                  };
                  const bg = map[lvl] || '#000';
                  return { borderColor: '#000', backgroundColor: bg };
                }
              }
            }
          }
        },
        plugins: [{
          id: 'drawIcons',
          afterDraw: (chart) => {
            const yScale = chart.scales.y;
            const left = chart.chartArea.left;
            const ctx2 = chart.ctx;
            const iconW = 24;
            const iconH = 24;
            ctx2.save();
            icons.forEach((img, i) => {
              // obtener pixel Y para el centro de la barra
              let y;
              try { y = yScale.getPixelForValue(i); } catch(e) { y = yScale.getPixelForValue(names[i]); }
              const x = left - iconW - 8; // 8px separación
              if(img && img.complete) {
                ctx2.drawImage(img, x, y - iconH/2, iconW, iconH);
              }
            });
            ctx2.restore();
          }
        }]
      });

      // redibujar si alguna imagen carga después
      icons.forEach(img => {
        if (!img.complete) img.onload = () => chart.draw();
      });
    });