auth = firebase.auth();
db = firebase.database();

auth.onAuthStateChanged(function (user) {
  if (user) {
    //photo
    $('.dropdown-item').click((e) => {
      auth.signOut().then(() => {
        window.location.href = 'http://localhost:5500/';
      });
    });
    const photoRef = db.ref(`empresas/${user.uid}`);
    photoRef.once('value').then(function (snapshot) {
      $('#userPhoto').attr('src', snapshot.val().img);
      $('#empName').html(snapshot.val().empname);
    });
  }
});
