// Attach a submit handler to the form
$("#form-id").submit(
    function(event) {

      // Stop form from submitting normally
      event.preventDefault();

      // Get form values from elements on the page:
      var $form = $(this);
      formLabel = $form.find("input[id='title-edit-label']").val();
      formId = $form.find("input[id='title-edit-id']").val(); 
      formYear = $form.find("input[id='title-edit-year']").val();
      formDescription = $form.find("textarea[id='title-edit-description']").val();
      url = $form.attr("action");

      // Create and fill POST/PUT object
      json = {};
      json.label = formLabel;
      json.year = formYear;
      json.description = formDescription;
      
      // If no title id is set, create a new title
      if (formId.length === 0) {
        $.ajax({
          type : "POST",
          url : url,
          data : JSON.stringify(json),
          contentType : "application/json; charset=utf-8",
          dataType : "json",
          success : function(data) {
            setContent("/titles.html");
            $('#myModal').modal('hide');
          },
          failure : function(errMsg) {
            alert("Failed generating item"); // some dirty debug
          }
        });
      } else {
        $.ajax({
          type : "PUT",
          url : formId,
          data : JSON.stringify(json),
          contentType : "application/json; charset=utf-8",
          dataType : "json",
          success : function(data) {
            setContent("/titles.html");
            $('#myModal').modal('hide');
          },
          failure : function(errMsg) {
            alert("Failed generating item"); // some dirty debug
          }
        });
      }
    });