$(document).ready(function(){
	var details = $("#accordion ul ul");
	$(details).hide();
	$("#accordion li").click(function(){
		$(details).slideUp();
		if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
		}
	})
})

