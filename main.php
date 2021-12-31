<!DOCTYPE html>
<html>
<head>
	<title>Matematika | <?=$operationRs?></title>
	<link rel="icon"
	      type="image/png"
	      href="../assets/img/calc_ico.png">
	<meta name="description" content="<?=$descriptionRs?>">
	<meta name="author" content="David Šili">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name=viewport content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'>
	<link rel="stylesheet" href="../assets/css/style.css?t=2">
</head>
<body>
<div class="wrapper">
	<div class="header">
		<div class="title">Učenje <?=$operationRsAc?></div>
		<div class="time hidden"></div>
		<div class="form form--type">
			<label class="form__label">Vrsta testa:</label>
			<select class="type">
				<?php foreach ($testTypes as $type) { ?>
					<option value="<?=$type?>"<?=$defaultTestId === $type ? ' selected="selected"' : ''?>>
						Do <?=$type?></option>
				<?php } ?>
			</select>
		</div>
		<div class="progress-indicator"></div>
	</div>
	<div class="form form--task" data-test-id="1">
		<div class="task">
			<span class="number-1"></span>
			<span class="operand"><?=$operand?></span>
			<span class="number-2"></span>
			<span class="operand">=</span>
		</div>
		<input class="answer" type="number" step="1" min="0" max="100" />
		<br>
		<button class="btn btn-primary check-btn">Sledeći</button>
	</div>
	<div class="message-container hidden">
		<table class="results-list">
			<tbody></tbody>
		</table>
		<p class="test-grade"></p>
		<button class="btn btn-primary new-test-btn">Ponovi test</button>
	</div>
</div>
<script>
	const operand = '<?=$operand?>';
</script>
<script src="../assets/js/jquery-3.6.0.min.js"></script>
<script src="../assets/js/test.js?t=2"></script>
</body>
</html>