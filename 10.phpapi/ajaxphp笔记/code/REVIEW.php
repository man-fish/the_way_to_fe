<?php 
	function getSum(){
		$sum=0;
		for($i-0;$i<func_num_args();$i++){
			$sum+=func_get_arg($i);
		}
		echo $sum;
		var_dump(func_get_args());
	}
 ?>