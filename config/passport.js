var passport = require('passport');
var User = require("../models/users");
var LocalStrategy = require('passport-local').Strategy;

sport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  })
});

// local sign-up
passport.use('local.signup', new LocalStrategy({
  // mặc định local strategy sử dụng username và password
  //chúng ta có thể cấu hình lại
  usernameField: 'username',
  userpasswordField: 'userpassword',
  usermailField: 'usermail',
  passReqToCallback: true // cho phép chúng ta gửi reqest lại hàm callback
}, function (req, usermail, username, userpassword, done) {
  // Tìm một user theo email
  // chúng ta kiểm tra xem user đã tồn tại hay không
  User.findOne({ 'usermail': usermail }, function (err, user) {
    if (err) { return done(err); }
    if (user) {
      return done(null, false, { message: 'Email is already in use.' })
    }
    // Nếu chưa user nào sử dụng email này
    // tạo mới user
    var newUser = new User();
    // lưu thông tin cho tài khoản local
    newUser.email = email;
    newUser.password =
      newUser.encryptPassword(password);
    // lưu user
    newUser.save(function (err, result) {
      if (err) {
        return done(err)
      }
      return done(null, newUser);
    })
  });
}
));