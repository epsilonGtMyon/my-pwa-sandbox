(function(){

  const incrementElem = document.querySelector('#increment')
  const countElem = document.querySelector('#count')

  incrementElem.addEventListener('click', () => {

    let count = Number(countElem.textContent || 0)
    count++
    countElem.textContent = count

  })

  
  
})()