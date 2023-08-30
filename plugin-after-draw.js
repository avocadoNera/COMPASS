Chart.plugins.register({
	afterDraw: function(chart) {
	  var width = chart.chart.width,
		  height = chart.chart.height,
		  ctx = chart.chart.ctx;
  
	  ctx.restore();
	  var fontSize = (height / 80).toFixed(2);
	  ctx.font = fontSize + "em sans-serif";
	  ctx.textBaseline = "middle";
	  ctx.fillStyle = "grey";
	  var lines = ["S" + rank, winP];
	  var lineHeight = fontSize * 14;

	  for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var textX = Math.round((width - ctx.measureText(line).width) / 2);
		var textY = height / 2 - ((lines.length - 1) * lineHeight / 2) + 10;
		
		if(i == 1){
			ctx.restore();
			fontSize = (height / 140).toFixed(2);
	  		ctx.font = fontSize + "em sans-serif";
			ctx.textBaseline = "middle";
			textX = Math.round((width - ctx.measureText(line).width) / 2);
			textY = height / 2 - ((lines.length - 1) * lineHeight / 2) + lineHeight + 10;
		}
		ctx.fillText(line, textX, textY);
	  }
	  ctx.save();
	}
  });