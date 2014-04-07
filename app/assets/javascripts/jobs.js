//= require jquery.signaturepad.min
//= require faults
//= require jquery.cookie
function saveJob()
{  
  var res = $('#client-name').val().split(" ");
  if(res[1] == undefined)
  {
    res[1] = ""
  }
  if($.trim($('#job-type').val()).length == "" || $.trim($('#contact-name').val()).length == "")
  {
    alert('Please fill in all fields')
  }
  else if(checkFaultFields())
  {
    alert('Please fill in faults')
  }
  else if($("#saveSignature").attr("src") == "")
  {
    alert('Please fill in signature')
  }
  else
  {
    $("#inner").hide('slide');
    $("#loader").show('slide');
    var data={
      job   : $('#job-type').val(),
      address : $('#address').val(),
      qmnum : $('#qmnum').attr("value"),
      qmart    : $('#qmart').attr("value"),
      qmartx : $('#qmartx').attr("value"),
      clientname : res[0],
      clientname2 : res[1], //clientname2 will have a value only if there are two clients. Separate two names from #client-name.
      soldto : 0,
      contactname1 : $('#contact-name').val(),
      telf1 : $('#phone').val(),
      telf2 : $('#alt-phone').val(),
      book_date : $('#booking-date').val(),
      start_date : $('#date').val(),
      contact_email1 :$('#email').val(),
      zz_melways : $('#melways-ref').val(),
      supr_email : $('#supervisor-email').val(),
      coord_email : $('#coordinator-email').val(),
      user_id : $('#user_id').attr("value")

    };
    fault_ids = new Array();
    for(var k = 1; k < parseInt($('#ctr_value').attr("value")); k++ )
    {
      fault_ids[k] = parseInt($('#fault_id_'+k).attr("value"));
    }
      // alert("a")
    setTimeout(function(){
      $.ajax({  
        type: "PUT",
        url: "/ajax/create_jobs", 
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: JSON.stringify({job: data, signature: $("#saveSignature")[0].src, fault_ids: fault_ids}),  
        dataType: "json",
        contentType: 'application/json',
        success: function(result){
          saveFaults(result.id,1);
        }, 
        error: function(result) {
          alert('an error has occured')
          $("#inner").show('slide');
          $("#loader").hide('slide');
        }
      });
    },1000)
  }
  return false;
}

function printPDF(){
  var res = $('#client-name').val().split(" & ");
  if(res[1] == undefined)
  {
    res[1] = ""
  }
  if($.trim($('#job-type').val()).length == "" || $.trim($('#contact-name').val()).length == "")
  {
    $("#inner").show('slide');
    $("#loader").hide('slide');
    alert('Please fill in all fields')
    return false;
  }
  else if(checkFaultFields())
  {
    $("#inner").show('slide');
    $("#loader").hide('slide');
    alert('Please fill in faults')
    return false;
  }
  else if($("#saveSignature").attr("src") == "")
  {
    $("#inner").show('slide');
    $("#loader").hide('slide');
    alert('Please fill in signature')
    return false;
  }
  else
  {
    var data = new Array();
    var image;
    for(x = 1; x < parseInt($('#ctr_value').attr("value")); x++){
      if(image_array[x] != undefined)
      {
        image = image_array[x];
      }
      else
      {
        image = $("#fault_image_"+x).attr("src");
      }
      if($("#detail_"+x).val() != undefined)
      {
        data[x - 1]={
          details : $("#detail_"+x).val(),
          location : $("#location_"+x).val(),
          comment : $("#comment_"+x).val(),
          cause_code : $("#cause-code_"+x).val(),
          reason : $("#reason_"+x).val(),
          vendor : $("#vendor_"+x).val(),
          image : image,
        };
      }
    }
    $('#data').attr("value", JSON.stringify(data));
    return true;
  }
  // $.ajax({  
  //   type: "PUT",
  //   url: "/ajax/set_image", 
  //   beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
  //   data: JSON.stringify({signature: $("#saveSignature")[0].src}),  
  //   dataType: "json",
  //   contentType: 'application/json', // what is this line
  //   success: function(result){
  //     alert(result)
  //     $('#image').attr("value", result);
  //     // setTimeout(function(){cancelInquiry();}, 500);
  //   }, 
  //   error: function(result) {
  //   }
  // });
}

function clearEntry()
{
  saveSignatureClear();
  $('#email').val("");
  max = parseInt($('#ctr_value').attr("value"));
  for( var k = 1; k <= max; k++)
  {
    addColumns(false,k);
  }
}

function deleteEntry(){
  $("#inner").hide('slide');
  $("#loader").show('slide');
  $.ajax({  
    type: "PUT",
    url: "/ajax/delete_job", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: JSON.stringify({qmnum : $('#qmnum').attr("value")}),  
    dataType: "json",
    contentType: 'application/json', // what is this line
    success: function(result){
      reload('draft');
      // setTimeout(function(){cancelInquiry();}, 500);
    }, 
    error: function(result) {
    }
  });
}

function checkFaultFields()
{
  var found = false;
  max = parseInt($('#ctr_value').attr("value"));
  for( var k = 1; k <= max; k++)
  {
    if($('#reason_'+k).val() == '')
    {
      found = true;
    }
  }
  return found;
}

$(document).ready(function(){
  $('form').bind("keypress", function(e) {
    if (e.keyCode == 13) {      
      e.preventDefault();
      return false;
    }
  });
});