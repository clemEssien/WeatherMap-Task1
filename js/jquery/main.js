$(document).ready(function()
{
 $("#apiButton").hide();

});

function cleanUpDialog()
{
  $("#weatherSubmit").prop('disabled', false);
  $("#weatherSubmit").text("Submit");		
}

function processDialog()
{
	if($('#locationForm').valid())
	{
	  $("#weatherSubmit").prop('disabled', true);
      $("#weatherSubmit").text("Loading");
	}	
	else
	{
	  return;
	}
}


function showDialog()
{

	 $("#myModal1").modal({
		backdrop: 'static'
	});
  
  $('#myModal1').modal('show');	
  $("#country").val('');	  
	
	$('#locationForm').validate({ // initialize the plugin
        rules: {
            pcode: {
                required: true,
				
            }        },
		 messages: {
        	pcode:{ 
			required: "Please enter your postcode"
			}
		
		 }
	});
}

function hideDialog()
{ 
   
  $('#pcode').val('');
  $('#myModal1').modal('hide');	

}