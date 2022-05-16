var empties = $("form").find('input:text').filter(function() { 
    // добавьте здесь дополнительные проверки на целочисленность и т.п.
    return $(this).val() == ""; 
  });
  
  if (empties.length > 0) {
    console.log("has empty inputs");
  }