var cartArray=[]
$(document).ready(function(){
    
    $.ajax({
        type:"GET",
        url:"product.json",
        success:function(response){
            for(var x of response.T_shirt){
                var card="<div data-id='"+x.id+"' data-type='T_shirt' class='card col-md-6 col-lg-3 py-1 border-0'>"+
                    "<div class='border rounded'>"+
                        "<img src='"+x.image+"' class='card-img-top' alt='...'>"+
                        "<div class='card-body text-center text-md-left'>"+
                            "<h5 class='card-title'>"+x.productName+"</h5>"+
                            "<p class='card-text'>"+x.price+"</p>"+
                            "<a href='#' class='btn btn-primary btn-orange showDtailsButton'>Quick Shop</a>"+
                        "</div>"+
                    "</div>"+
                "</div>"
                $(".addTshirtProduct").append(card)
            }

            for(var x of response.Jeans){
                var card="<div data-id='"+x.id+"'  data-type='Jeans' class='card col-md-6 col-lg-3 py-1 border-0'>"+
                    "<div class='border rounded'>"+
                        "<img src='"+x.image+"' class='card-img-top' alt='...'>"+
                        "<div class='card-body text-center text-md-left'>"+
                            "<h5 class='card-title'>"+x.productName+"</h5>"+
                            "<p class='card-text'>"+x.price+"</p>"+
                            "<a href='#' class='btn btn-primary btn-orange showDtailsButton'>Quick Shop</a>"+
                        "</div>"+
                    "</div>"+
                "</div>"
                $(".addJeansProduct").append(card)
            }

            for(var x of response.dress){
                var card="<div data-id='"+x.id+"'  data-type='dress' class='card col-md-6 col-lg-3 py-1 border-0'>"+
                    "<div class='border rounded'>"+
                        "<img src='"+x.image+"' class='card-img-top' alt='...'>"+
                        "<div class='card-body text-center text-md-left'>"+
                            "<h5 class='card-title'>"+x.productName+"</h5>"+
                            "<p class='card-text'>"+x.price+"</p>"+
                            "<a href='#' class='btn btn-primary btn-orange showDtailsButton'>Quick Shop</a>"+
                        "</div>"+
                    "</div>"+
                "</div>"
                $(".addDressProduct").append(card)
            }
        }
    })
    
 

    $(".size").click(function () {
        $(".size").removeClass("sizeclicked")
        $(this).addClass("sizeclicked")
    })

    var currentProduct;

    $(document).on("click", $(".showDtailsButton"), function (e) {

        if (e.target.nodeName == "A") {
            var IsshowDtailsButton = $(e.target).attr("class").search("showDtailsButton")
            if (IsshowDtailsButton != -1) {
                var idOfCard = $(e.target).parent().parent().parent().attr("data-id")
                var typeOfProduct = $(e.target).parent().parent().parent().attr("data-type");
                e.preventDefault()

                $.ajax({
                    url: "product.json",
                    success: function (response) {
                        if (typeOfProduct == "T_shirt") {
                            typeOfProduct = response.T_shirt;
                        } else if (typeOfProduct == "Jeans") {
                            typeOfProduct = response.Jeans;
                        } else if (typeOfProduct == "dress") {
                            typeOfProduct = response.dress;
                        }
                        for (var x of typeOfProduct) {
                            if (x.id == idOfCard) {
                                currentProduct = x;
                                $(".details-big-image").attr("src", x.image)
                                $(".details-Name").text(x.productName)
                                $(".details-Price").text(x.price)
                                $(".details-descripe").text(x.descripe);       
                                $(".Quantity").val(1)
                            }
                        }
                    },
                    complete: function () {
                        $(".showProductDetails").toggleClass("d-none")
                    }
                })
            }


        }
    })
    $(".CloseshowProductDetail").click(function () {
        $(".showProductDetails").toggleClass("d-none")
    })

    $(".btn-Decrease").click(function () {
        var quent = parseInt($(".Quantity").val())
        if (quent > 1) {
            $(".Quantity").val(quent - 1)
        }
    })
    $(".btn-Increase").click(function () {
        var quent = parseInt($(".Quantity").val())
        $(".Quantity").val(quent + 1)
    })



    if(!localStorage.getItem("login")){
        var userRegist=[]
        $.ajax({
            type: "GET",
            url: "data.json",
            success: function (response) {
                userRegist=response;
            },
            complete:function(){
                localStorage.setItem("login",JSON.stringify(userRegist))
            }
        })    
    }
    $(".btn-login").click(function () {
        var email = $("#exampleInputEmail1").val();
        var password = $("#exampleInputPassword1").val();
        isLogin = 0;
        if (email != "" && password != "") {
            var userInWebsite=JSON.parse(localStorage.getItem("login"))
            for (var x of userInWebsite) {
                if (x.email == email) {
                    if (x.password == password) {
                        isLogin = 1;
                        localStorage.setItem("userName", x.name);
                        $("#exampleModal").modal('hide')
                        $(".passNotCorrect").css("display", "none")
                        assignPreOrderToParticualUser()
                    } else {
                        $(".passNotCorrect").css("display", "block")
                    }
                }
            }
            if (isLogin) {
                $(".nav-login").css("display", "none")
                $(".nav-regist").css("display", "none")
                $(".nav-Sign-Out").css("display", "block")
                $(".btn-cart").css("display", "block")
            }
        }
    })
     
    $(".btn-regist").click(function(){
        var namePattern=/^[a-zA-Z]{3,}/
        var emailPattern=/[a-zA-Z0-9]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,}/
        var passwordPattern=/[a-zA-Z0-9]{8,}/
        var checkUserName=namePattern.test($("#userName").val())
        var checkEmail=emailPattern.test($("#EmailRegist").val())
        var checkPassword=passwordPattern.test($("#PasswordRegist").val())
        var passwordRepeat=0
        
        if(!checkUserName){
            $(".userInform").css("display","block")
        }else{
            $(".userInform").css("display","none")
        }

        if(!checkEmail){
            $(".emailInform").css("display","block")
        }else{
            $(".emailInform").css("display","none")
        }

        if(!checkPassword){
            $(".passwordInform").css("display","block")
        }else{
            $(".passwordInform").css("display","none")
        }

        if($("#PasswordRegist").val()!=$("#PasswordRepeatRegist").val()){
            $(".notRepeadInform").css("display","block")
            passwordRepeat=0
        }else{
            $(".notRepeadInform").css("display","block")
            passwordRepeat=1
        }
        var userExist=JSON.parse(localStorage.login)
        var isUserExist=0
        for(var x of userExist){
            if($("#userName").val()==x.name || $("#EmailRegist").val()==x.email){
                isUserExist=1;
            }
        }
        if(isUserExist==0){
            $(".userExistInform").css("display", "none")
            if(checkUserName && checkEmail && checkPassword && passwordRepeat){
                userRegist=JSON.parse(localStorage.getItem("login"))
                user={
                    "name":$("#userName").val(),
                    "email":$("#EmailRegist").val(),
                    "password":$("#PasswordRegist").val()
                }
                userRegist.push(user)
                localStorage.setItem("login",JSON.stringify(userRegist))
                localStorage.setItem("userName", $("#userName").val());
                $("#exampleModalregist").modal('hide')
                $(".userExistInform").css("display", "none")
                convertToUserMode()
            }
        }else{
            $(".userExistInform").css("display", "block")
        }
    })
    function convertToUserMode(){
        if (localStorage.userName) {
            $(".nav-login").css("display", "none")
            $(".nav-regist").css("display", "none")
            $(".nav-Sign-Out").css("display", "block")
            $(".btn-cart").css("display", "block")
            assignPreOrderToParticualUser()
        }
    }
    convertToUserMode()
    $(".btn-sign-out").click(function (e) {
        localStorage.removeItem("userName");
        $(".nav-login").css("display", "block")
        $(".nav-regist").css("display", "block")
        $(".nav-Sign-Out").css("display", "none")
        $(".btn-cart").css("display", "none")
    })

    function assignPreOrderToParticualUser() {
        var userName = localStorage.userName;
        if (!localStorage.getItem(userName)) {
            cartArray = [];
        } else {
            cartArray = []
            cartArray = JSON.parse(localStorage.getItem(userName))

        }
    }

    $(".btn-Add-To-Card").click(function () {
        var userName = localStorage.userName;
        if (localStorage.userName) {
            var quent = parseInt($(".Quantity").val())
            var isAdd = 0;
            if (cartArray.length > 0) {
                for (var i = 0; i < cartArray.length; i++) {
                    if (cartArray[i].id == currentProduct.id && cartArray[i].productName == currentProduct.productName) {
                        cartArray[i].quent = parseInt(cartArray[i].quent) + quent
                        isAdd = 1;
                    }
                }
                if (isAdd == 0) {
                    currentProduct.quent = quent;
                    cartArray.push(currentProduct)
                }
            } else {
                currentProduct.quent = quent;
                cartArray.push(currentProduct);
            }
            localStorage.setItem(userName, JSON.stringify(cartArray));
            $(".showProductDetails").toggleClass("d-none")
        } else {
            $("#exampleModal").modal()
        }
    })



})


$(".cart-page").ready(function(){
    var userName
    if(localStorage.userName)
        userName=localStorage.userName;
    var cartOfUser=[]
    if(localStorage.getItem(userName))
        cartOfUser=JSON.parse(localStorage.getItem(userName))
    
    
    function printProductFromCart(){
        for(var x of cartOfUser){
            var row="<tr class='align-item-center'>"+
                "<th scope='row'>"+ 
                    "<img src="+x.image+" class='img-fluid cart-product-img'>"+
                    "<p style='display: inline;'>"+ x.productName +"</p>"+
                "</th>"+
                "<td class='text-center td'> "+ x.price +"</td>"+
                "<td class='text-center td'>"+ x.quent +"</td>"+
                '<td class="text-center td"> <button class="btn btn-danger btn-edit" data-id="'+x.id+'" data-Pname="'+x.productName+'">'+
                "Edit</button> </td>"+
            "</tr>"
            
    
            $(".cart-product-view").append(row)
        }
    }
    printProductFromCart();
    
    var currentProductEdit;
    $(".btn-edit").click(function(){
        var pId=$(this).attr("data-id");
        var pName=$(this).attr("data-Pname");
        for (var i = 0; i < cartOfUser.length; i++) {
            if (cartOfUser[i].id == pId && cartOfUser[i].productName == pName) {
                currentProductEdit=cartOfUser[i];
                currentProductEditIndex=i;
                $(".edit-product-image").attr("src",cartOfUser[i].image)
                $(".edit-product-Name").text(cartOfUser[i].productName)
                $(".edit-product-Price").text(cartOfUser[i].price)
                $(".edit-product-Quantity").val(cartOfUser[i].quent)                
            }
        }
        $(".showEditDiv").toggleClass("d-none");
        
    })
    $(".edit-product-btn-save").click(function(){
        currentProductEdit.quent=$(".edit-product-Quantity").val()
        $(".cart-product-view").empty()
        $(".showEditDiv").toggleClass("d-none");
        localStorage.setItem(userName,JSON.stringify(cartOfUser))
        location.reload()
    })
    $(".btn-remove").click(function(){
        cartOfUser.splice(currentProductEditIndex,1)
        $(".cart-product-view").empty()
        printProductFromCart();
        $(".showEditDiv").toggleClass("d-none");
        localStorage.setItem(userName,JSON.stringify(cartOfUser))
        location.reload()
    })
    $(".CloseshowProductDetail").click(function(){
        $(".showEditDiv").toggleClass("d-none")
    })
    $(".btn-Decrease").click(function(){
        var quent=parseInt($(".edit-product-Quantity").val())
        if(quent>1){
            $(".edit-product-Quantity").val(quent-1)
        }
    })
    $(".btn-Increase").click(function(){
        var quent=parseInt($(".edit-product-Quantity").val())
        $(".edit-product-Quantity").val(quent+1)
    })

})