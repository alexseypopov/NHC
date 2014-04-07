var image_array = new Array();
var image_array_ctr = 0;
function saveFaults(job_id, ctr)
{


  var x = ctr;
  var id = $('#fault_id_'+x).attr("value");
  var data={
    details : $("#detail_"+x).val(),
    location : $("#location_"+x).val(),
    comment : $("#comment_"+x).val(),
    cause_code : $("#cause-code_"+x).val(),
    reason : $("#reason_"+x).val(),
    vendor : $("#vendor_"+x).val(),
    job_id : job_id,
    image : $('#fault_image_'+x).attr("src"),
    
  };
  // var id = $('#fault_id_'+x).attr("value");
  var img = image_array[x];

  if(x < parseInt($('#ctr_value').attr("value")))
  {
    // alert(img)
    $.ajax({  
      type: "PUT",
      url: "/ajax/create_faults", 
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: JSON.stringify({faults: data, image: img, id:id}),  
      dataType: "json",
      contentType: 'application/json',
      success: function(result){
        saveFaults(job_id, x + 1);
      }, 
      error: function(result) {
        alert('An error has occured')
        $("#inner").show('slide');
        $("#loader").hide('slide');
      }
    });
  }
  else
  {
    reload('draft');
  }

}

function readImage(input) {
    if ( input.files && input.files[0] ) {
        
        var FR= new FileReader();
        FR.onload = function(e) {
          image_array[image_array_ctr] = e.target.result;
          // alert("asdasd =" + image_array_ctr)
          // alert(e.target.result)
             // $('#image-preview').attr( "src", e.target.result );
             // $('#base').text( e.target.result );
        };       
        FR.readAsDataURL( input.files[0] );
    }
}

$(document).on("change", ".image", function() {
  image_array_ctr = parseInt(this.id.charAt(this.id.length - 1));
  readImage( this );
});

function removeImage(id){
  ver = iOSversion();
  if($('#fault_image_' + id).attr('src') != undefined)
  {
    $('#fault_image_' + id).attr('src', '');
  }
  if(ver != undefined)
  {
    if (ver[0] >= 6){
      image_array[id] = '';

      $('#type_image_'+id+'').val('');
    }
  }
  if(navigator.platform.indexOf("iPad") == -1)
  {
    image_array[id] = '';
    $('#type_image_'+id+'').val('');
  }

}

function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
}

