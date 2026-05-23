document.getElementById("reveal-button").addEventListener("click", function(){
    document.getElementById("rose").classList.remove("hidden");
    document.getElementById("text").classList.remove("hidden");
    document.getElementById("arrow").classList.remove("hidden");
    document.getElementById("no-button").classList.remove("hidden");
    document.getElementById("yes-button").classList.remove("hidden");
  });

  function getRandomNumber1() {
    return Math.floor(Math.random() * 5);
  }

  function getRandomNumber2() {
    return Math.floor(Math.random() * 6);
  }

  document.getElementById("love-button").addEventListener("click", function(){
    love_paragraphs = [
      "i love you more than anything in the world",
      "you make everything so much better, all my problems seem to vanish when im with you",
      "i love everything about you, your laugh, your smile, your voice, you. simply i just love you and everything you are",
      "your smile alone, no just seeing you can brighten up my day",
      "i can not say how proud i am to be with someone as strong as you",
      "you are irreplacable",
      "the thought of losing you breaks my heart, you are the constant in my life, you give me strength and purpose",
   ]
   
    alert(love_paragraphs[getRandomNumber2()]);
  });



  document.getElementById("no-button").addEventListener("click", function(){
    let responses = ["i think you pressed the wrong button", "hmmm let's go back and decide again", "i think you are looking for another answer", "are you sure you picked the right button?", "i urge you to reconsider. please"]
    alert(responses[getRandomNumber1()]);
  });

  document.getElementById("yes-button").addEventListener("click", function(){
    alert("i love you forever and always, you are my world. i am never going to leave you. you are mine and i am yours. the one person i want to spend the rest of my life with");
  });

