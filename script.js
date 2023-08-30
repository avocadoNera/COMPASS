const ctx = document.getElementById('BPChart').getContext('2d');
const BPChart = new Chart(ctx, {
	type: 'doughnut',
	data: {
		//labels: ['win', 'lose'],
		datasets: [{
			label: 'BP',
			data: [winP, 500 - winP],
			backgroundColor: ['yellow','grey'],
		}]
	},
	options: {
		cutoutPercentage: 70,
		maxWidth: 200,
		responsive: true,
		tooltips: {
			enabled: false
		},
	}
});

update_value();

//Push "plus" button
document.getElementById("plus").addEventListener("click", function() {

	winP++;
	if(winP >= 500){
		if(rank == 9){
			winP = 500;
		} else {
			rank++;
			winP = winP - 500;
		}
	}
	let newData = [winP, 500 - winP];
	BPChart.data.datasets[0].data = newData;
	BPChart.update();
	
	update_value();
});

//Push "win" button
document.getElementById("win").addEventListener("click", function() {

	winP += rank_win_pt[rank];
	if(winP >= 500){
		if(rank == 9){
			winP = 500;
		} else {
			rank++;
			winP = winP - 500;
		}
	}
	let newData = [winP, 500 - winP];
	BPChart.data.datasets[0].data = newData;
	BPChart.update();
	
	update_value();
});

//Push "lose" button
document.getElementById("lose").addEventListener("click", function() {

	winP -= rank_lose_pt[rank];
	if(winP < 0){
		if(rank == 1){
			winP = 0;
		}else{
			rank--;
			winP += 500;
		}
	}
	let newData = [winP, 500 - winP];
	BPChart.data.datasets[0].data = newData;
	BPChart.update();

	update_value();
});

//Push "minus" button
document.getElementById("minus").addEventListener("click", function() {

	winP--;
	if(winP < 0){
		if(rank == 1) {
			winP = 0;
		} else {
			rank--;
			winP += 500;
		}
	}

	let newData = [winP, 500 - winP];
	BPChart.data.datasets[0].data = newData;
	BPChart.update();
	
	update_value();
});

//push "border" button
document.getElementById("set-border").addEventListener("click", function() {

	let input_rank = document.getElementById('border-rank');
	let input_BP   = document.getElementById('border-BP');

	let check_rank = parseInt(input_rank.value.slice(1));
	let check_BP   = parseInt(input_BP.value);

	if(!(check_value_range(check_rank, check_BP))){
		alert("ランクまたはBPの値がおかしいよ！");
		return;
	}

	border_rank_bronze = check_rank;
	border_pt_bronze   = check_BP;

	update_value();
});

//push "rank-and-BP" button
document.getElementById("set-rank-and-BP").addEventListener("click", function() {

	let input_rank = document.getElementById('value-rank');
	let input_BP   = document.getElementById('value-BP');

	let check_rank = parseInt(input_rank.value.slice(1));
	let check_BP   = parseInt(input_BP.value);

	if(!(check_value_range(check_rank, check_BP))){
		alert("ランクまたはBPの値がおかしいよ！");
		return;
	}

	rank = check_rank;
	winP = check_BP;

	let newData = [winP, 500 - winP];
	BPChart.data.datasets[0].data = newData;
	BPChart.update();

	update_value();
});

//push "win_rate" button
document.getElementById("set-win-rate").addEventListener("click", function() {

	let input_win_rate = document.getElementById('value-win-rate');

	let check_win_rate = parseInt(input_win_rate.value);

	if(!(check_value_range_win_rate(check_win_rate))){
		alert("1 ～ 100 の範囲を指定してください！");
		return;
	}

	win_rate = check_win_rate;

	update_value();
});

function update_value() {
	console.log("??");
	let is_win_rate_over = false;

	//calc wins_needed_bronze
	let now_rank      = rank;
	let now_pt        = winP;
	let now_all_pt    = rank * 500 + winP;
	let border_all_pt = border_rank_bronze * 500 + border_pt_bronze;
	let cnt           = 0;
	while(true){
		if(now_all_pt >= border_all_pt) break;
		if(now_all_pt < 1000) now_all_pt += rank_win_pt[1];
		else if(now_all_pt < 1500) now_all_pt += rank_win_pt[2];
		else if(now_all_pt < 2000) now_all_pt += rank_win_pt[3];
		else if(now_all_pt < 2500) now_all_pt += rank_win_pt[4];
		else if(now_all_pt < 3000) now_all_pt += rank_win_pt[5];
		else if(now_all_pt < 3500) now_all_pt += rank_win_pt[6];
		else if(now_all_pt < 4000) now_all_pt += rank_win_pt[7];
		else if(now_all_pt < 4500) now_all_pt += rank_win_pt[8];
		else if(now_all_pt < 5000) now_all_pt += rank_win_pt[9];

		cnt++;
	}
	wins_needed_bronze = cnt;
	cnt = 0;
	now_all_pt = rank * 500 + winP;

	//calc battles_needed
	let win_cnt = 0;
	let lose_cnt = 0;

	console.log("ループ前cnt: "+cnt);
	while(true){

		win_cnt         = Math.ceil(cnt * (win_rate * 0.01));
		lose_cnt        = Math.ceil(cnt * ((100 - win_rate) * 0.01)) - 1;
		let all_win_BP  = now_all_pt;
		let all_lose_BP = 0;

		console.log("cnt: " + cnt + "(" + win_cnt + "/" + lose_cnt + ")" + "now_all_p: " + now_all_pt);
		//calc a tentative number of wins
		for(let i = 0; i < win_cnt; i++){
			if(all_win_BP < 1000) all_win_BP += rank_win_pt[1];
			else if(all_win_BP < 1500) all_win_BP += rank_win_pt[2];
			else if(all_win_BP < 2000) all_win_BP += rank_win_pt[3];
			else if(all_win_BP < 2500) all_win_BP += rank_win_pt[4];
			else if(all_win_BP < 3000) all_win_BP += rank_win_pt[5];
			else if(all_win_BP < 3500) all_win_BP += rank_win_pt[6];
			else if(all_win_BP < 4000) all_win_BP += rank_win_pt[7];
			else if(all_win_BP < 4500) all_win_BP += rank_win_pt[8];
			else all_win_BP += rank_win_pt[9];
		}
		console.log(" win: " + all_win_BP)

		//calc a tentative number of loses
		for(let i = 0; i < lose_cnt; i++){
			if(all_lose_BP < 1000) all_lose_BP += rank_win_pt[9];
			else if(all_lose_BP < 1500) all_lose_BP += rank_lose_pt[8];
			else if(all_lose_BP < 2000) all_lose_BP += rank_lose_pt[7];
			else if(all_lose_BP < 2500) all_lose_BP += rank_lose_pt[6];
			else if(all_lose_BP < 3000) all_lose_BP += rank_lose_pt[5];
			else if(all_lose_BP < 3500) all_lose_BP += rank_lose_pt[4];
			else if(all_lose_BP < 4000) all_lose_BP += rank_lose_pt[3];
			else if(all_lose_BP < 4500) all_lose_BP += rank_lose_pt[2];
			else all_lose_BP += rank_lose_pt[1];
		}

		console.log("lose: " + all_lose_BP);
		console.log("win - lose: " + (all_win_BP - all_lose_BP));
		if(all_win_BP - all_lose_BP >= border_all_pt) break;

		//increase the number of battles by 1
		cnt++;

		if(cnt > 10000) {
			is_win_rate_over = true;
			break;
		}
	}
	console.log("ループ抜けた　cnt: "+cnt);
	battles_needed = cnt;

	if(is_win_rate_over) {
		document.getElementById('battles_needed').innerHTML = "現在の勝率ではボーダー越えは厳しいです";
		document.getElementById('battle').innerHTML = "";
	} else {
		document.getElementById('battles_needed').innerHTML = battles_needed;
		document.getElementById('battle').innerHTML = "戦";
	}

	document.getElementById('win_rate').innerHTML = win_rate;
	document.getElementById('wins_needed_bronze').innerHTML = wins_needed_bronze;
	document.getElementById('border_rank_bronze').innerHTML = border_rank_bronze;
	document.getElementById('border_pt_bronze').innerHTML = border_pt_bronze;
};