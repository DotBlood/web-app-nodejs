var empties = $("form").find('input:text').filter(function () {
  return $(this).val() == "";
});

if (empties.length > 0) {
  console.log("has empty inputs");
}