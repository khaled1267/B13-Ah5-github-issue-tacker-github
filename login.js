document.getElementById('btn-login').addEventListener('click', function () {

    const numInput = document.getElementById('input-user')

    const conNum = numInput.value

    console.log(conNum)

    const inputPin = document.getElementById('input-pass')

    const Pin = inputPin.value

    console.log(Pin)



    if (conNum == 'admin' && Pin == 'admin123') {

     

        window.location.assign('/tracker.html')

    }

    else{

       

        return

    }





})