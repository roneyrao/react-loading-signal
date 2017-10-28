<!doctype html>
<html lang="en">
<head>
    <title>Code coverage report for demo/index.js</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../prettify.css" />
    <link rel="stylesheet" href="../base.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(../sort-arrow-sprite.png);
        }
    </style>
</head>
<body>
<div class='wrapper'>
  <div class='pad1'>
    <h1>
      <a href="../index.html">All files</a> / <a href="index.html">demo</a> index.js
    </h1>
    <div class='clearfix'>
      <div class='fl pad1y space-right2'>
        <span class="strong">0% </span>
        <span class="quiet">Statements</span>
        <span class='fraction'>0/15</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">0% </span>
        <span class="quiet">Branches</span>
        <span class='fraction'>0/4</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">0% </span>
        <span class="quiet">Functions</span>
        <span class='fraction'>0/1</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">0% </span>
        <span class="quiet">Lines</span>
        <span class='fraction'>0/10</span>
      </div>
    </div>
  </div>
  <div class='status-line low'></div>
<pre><table class="coverage">
<tr><td class="line-count quiet">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21</td><td class="line-coverage quiet"><span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-no">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span></td><td class="text"><pre class="prettyprint lang-js">import React from 'react';<span class="cstat-no" title="statement not covered" ><span class="cstat-no" title="statement not covered" ></span></span>
import {render} <span class="cstat-no" title="statement not covered" >from 'react-dom';</span>
import {creat<span class="cstat-no" title="statement not covered" >eStore, applyMidd</span>leware} from 'redux';
import thunk from <span class="cstat-no" title="statement not covered" >'redux-thunk';<span class="cstat-no" title="statement not covered" ></span></span>
import {Provider} <span class="cstat-no" title="statement not covered" >from 'react-redux';</span>
&nbsp;
import reducer f<span class="cstat-no" title="statement not covered" >rom './reducers';<span class="cstat-no" title="statement not covered" ></span></span>
import {Panel1} fr<span class="cstat-no" title="statement not covered" >om './components';</span>
import Panel from <span class="cstat-no" title="statement not covered" >'./containers';<span class="cstat-no" title="statement not covered" ><span class="cstat-no" title="statement not covered" ><span class="fstat-no" title="function not covered" ></span></span></span></span>
&nbsp;
const store=<span class="cstat-no" title="statement not covered" >createStore(reducer, applyMiddleware(thunk));</span>
&nbsp;
<span class="cstat-no" title="statement not covered" >render(</span>
	&lt;Provider store={store}&gt;
		&lt;div&gt;
			&lt;Panel ix='1'&gt;{Panel1}&lt;/Panel&gt;
		&lt;/div&gt;
	&lt;/Provider&gt;
	,document.getElementById('root')
);
&nbsp;</pre></td></tr>
</table></pre>
<div class='push'></div><!-- for sticky footer -->
</div><!-- /wrapper -->
<div class='footer quiet pad2 space-top1 center small'>
  Code coverage
  generated by <a href="https://istanbul.js.org/" target="_blank">istanbul</a> at Sat Oct 28 2017 13:00:58 GMT+0800 (CST)
</div>
</div>
<script src="../prettify.js"></script>
<script>
window.onload = function () {
        if (typeof prettyPrint === 'function') {
            prettyPrint();
        }
};
</script>
<script src="../sorter.js"></script>
</body>
</html>
