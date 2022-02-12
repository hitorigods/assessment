'use strict';

const nameElm = document.getElementById('app-name');
const submitElm = document.getElementById('app-submit');
const resultElm = document.getElementById('app-result');
const tweetElm = document.getElementById('app-tweet');

const answers = [
	'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
	'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
	'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
	'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
	'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
	'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
	'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
	'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
	'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
	'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
	'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
	'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
	'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
	'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
	'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
	'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

submitElm.onclick = () => {
	submitFunc();
};

nameElm.onkeydown = event => {
console.log(event.key);
	if (event.key === 'Enter') {
		//submitElm.onclick();
		submitFunc();
	}
};

/**
 * 名前の文字列を渡すと診断結果を返す変数
 * @param {string} userName ユーザーの名前
 * @returns {string} 診断結果
 */
 function resultFunc(userName) {
	let char = 0;
	for (let i = 0; i < userName.length; i++) {
		char += userName.charCodeAt(i);
	}
	const index = char % answers.length;
	let result = answers[index];
	result = result.replaceAll('{userName}', userName);
	return result; // 診断結果
}

/**
 * 指定した要素の子要素をすべて削除する関数
 * @param {HTMLElement} element 削除した要素名
 */
function removeAllChiredren(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

/**
 * 入力された内容を出力する関数
 * @param {*} element
 */
function submitFunc() {
	// 名前が空の時は処理を終了する
	const nameValue = nameElm.value;
	if (nameValue.length === 0) {
		return;
	}

	const resultValue = resultFunc(nameValue);
	console.log(resultValue);

		// 診断結果表示エリアの作成
	removeAllChiredren(resultElm);
	const resultHeadElm = document.createElement('h2');
	const resultInputElm = document.createElement('p');
	resultHeadElm.classList.add('c-heading2');
	resultInputElm.classList.add('c-section_lead');
	resultHeadElm.innerText = '診断結果';
	resultInputElm.innerText = resultValue;
	resultElm.appendChild(resultHeadElm);
	resultElm.appendChild(resultInputElm);

		// ツイートボタンエリアの作成
	removeAllChiredren(tweetElm);
	const tweetButtonElm = document.createElement('a');
	const tweetHref = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
	tweetButtonElm.setAttribute('href', tweetHref);
	tweetButtonElm.classList.add('twitter-hashtag-button');
	tweetButtonElm.innerText = 'Tweetする';
	tweetButtonElm.setAttribute('data-text', resultValue);
	tweetElm.appendChild(tweetButtonElm);

	// widgets.js の設定
	const tweetScript = document.createElement('script');
	tweetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
	tweetElm.appendChild(tweetScript);	
}


// テストコード
console.assert(
	resultFunc('太郎') ===
		'太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
	'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
	resultFunc('太郎') === resultFunc('太郎'),
	'入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);