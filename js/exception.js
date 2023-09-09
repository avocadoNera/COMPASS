function check_value_range(arg_rank = 1, arg_BP = 1) {
	
	if(!(Number.isInteger(arg_rank))) return false;
	if(!(Number.isInteger(arg_BP))) return false;
	if(arg_rank < 1 || arg_rank > 9) return false;
	if(arg_BP < 0 || arg_BP > 500) return false;
	
	return true;
}

function check_value_range_win_rate(arg_win_rate) {
	
	if(!(Number.isInteger(arg_win_rate))) return false;
	if(arg_win_rate < 1 || arg_win_rate > 100) return false;

	return true;
}