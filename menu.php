<ul class="menu">
	<?php if ($operation !== 'home') { ?>
	<a href="/matematika" class="menu__link">
		<li class="menu__item"><i class="fa fa-home"></i> Izbor testa</li></a>
	<?php } ?>
	<a href="/matematika/sabiranje" class="menu__link">
		<li class="menu__item<?=$operation === 'addition' ? ' active' : ''?>">
		+ Sabiranje</li></a>
	<a href="/matematika/oduzimanje" class="menu__link">
		<li class="menu__item<?=$operation === 'subtraction' ? ' active' : ''?>">
		- Oduzimanje</li></a>
	<a href="/matematika/mnozenje" class="menu__link">
		<li class="menu__item<?=$operation === 'multiplication' ? ' active' : ''?>">
		· Množenje</li></a>
	<a href="/matematika/deljenje" class="menu__link">
		<li class="menu__item<?=$operation === 'division' ? ' active' : ''?>">
		÷ Deljenje</li></a>
	<a class="menu__link">
		<li class="menu__item tests-report-btn"><i class="fa fa-list"></i> Pregled testova</li></a>
</ul>