<br/>
<script type="text/javascript">
var timeout = <?php echo $_ini->get('refresh_rate') * 1000; ?>;
setTimeout("ajax(page,'stats')", timeout);
</script>

<div style="float: left;">
    <span class="title grey rounded" style="width:772px;">Live <span class="green">Stats</span></span>
    <div style="width:772px;padding-left:4px;">
        <br/>
        <pre id="stats" style="font-size:12px;overflow:visible;">
        Loading live stats, please wait ...</pre>
    </div>
</div>