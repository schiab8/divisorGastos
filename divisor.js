function sum(a) {
    total = 0;
    for (var i=0; i<a.length; i++) {
        if(a[i]){
            total += a[i];
        }
    }
    return total;
}


function update_cells() {
    rows = $("tbody tr");

    var amounts = [];
    rows.each( function() {
        amounts.push(parseFloat($(this).find(".amount").val()));
    });

    total = sum(amounts);
    average = total/amounts.length;

    $("#total").text("$ "+total.toFixed(2));
    $("#average").text("$ "+average.toFixed(2));
    
    rows.each( function() {
        var debt_amount = average - $(this).find(".amount").val();
        debt = $(this).find(".debt")
        debt.text("$ " + debt_amount.toFixed(2));
        if(debt_amount<=0) {
            debt.addClass("green");
            debt.removeClass("red");
        }
        else {
            debt.addClass("red");
            debt.removeClass("green");
        }
    });

}


function addPerson() {

    var new_row = ROW.clone();

    new_row.appendTo($('tbody')).show(450);
    new_row.find('.amount').keyup(function(){update_cells()});

    cant = $("tbody tr").length;
    new_row.find("td .name").val("Persona "+cant);

    $(new_row.children("td").children(".remove-person-button")).click(function() {
        removePerson(new_row);
    });
    update_cells();
}


function removePerson(p) {

    if($("tbody").children().length > 1){
        p.remove();
        update_cells();
    }
}


$(document).ready(function() {

    ROW = $('#copyMe').remove().removeAttr('id');

    $('.remove-person-button').click(function() {
        removePerson($(this).parent().parent())
    });

    $('.add-person-button').click(function() {
        addPerson();
    });
    update_cells();
    $('.amount').keyup(function(){update_cells()});

});

