<?php require('header.php'); ?>
<div class="wrapper grid grid--top-level">
	<div class="container container--first">
		<?php require('menu.php'); ?>
	</div>
	<div class="container container--last">
		<div class="header">
			<button class="btn btn-secondary menu-btn"><i class="fa fa-bars"></i></button>
			<div class="title">Učenje <?=$operationRsAc?></div>
			<div class="progress-indicator"></div>
			<div class="form form--type">
				<label class="form__label">Vrsta testa:</label>
				<select class="type">
					<?php foreach ($testTypes as $type) { ?>
						<option value="<?=$type?>"<?=$defaultTestId === $type ? ' selected="selected"' : ''?>>
							Do <?=$type?></option>
					<?php } ?>
				</select>
			</div>
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
			<button class="btn btn-secondary check-btn">Sledeći</button>
		</div>
		<div class="message-container hidden">
			<div class="time"></div>
			<table class="results-list">
				<tbody></tbody>
			</table>
			<p class="test-grade"></p>
			<button class="btn btn-secondary tests-report-btn">Pregled testova</button>
			<button class="btn btn-secondary new-test-btn">Ponovi test</button>
		</div>
		<div class="report-container hidden">
			<div class="title title--small">Izveštaj za <span class="date-span"></span></div>
			<table class="report-table table table-bordered">
				<thead>
				<tr>
					<th>Tačnih</th>
					<th>Ukupno</th>
					<th>Vrsta</th>
					<th>Vreme</th>
				</tr>
				</thead>
				<tbody></tbody>
			</table>
			<button class="btn btn-secondary new-test-btn">Novi test</button>
		</div>
	</div>
</div>
<script>
	const operation = '<?=$operation?>';
	const operand = '<?=$operand?>';
</script>
<script src="../assets/js/jquery-3.6.0.min.js"></script>
<script src="../assets/js/test.js?t=7"></script>
</body>
</html>