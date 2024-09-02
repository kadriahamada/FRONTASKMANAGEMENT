export const renderSignup = () => {
  return `
    <form id="signup" class="w-50 middleDisplay">
    <p><strike>Signup With Us</strike></p>
  <div class="mb-3">
    <label for="firstName" class="form-label">User Name</label>
    <input type="text" name="firstName" class="form-control" id="firstName" placeholder="name">
  </div>
  <div class="mb-3">
    <label for="lastName" class="form-label">User Last Name</label>
    <input type="text" name="lastName" class="form-control" id="lastName" placeholder="last name">
  </div>
   <div class="mb-3">
    <label for="email" class="form-label">User Email</label>
    <input type="email" name="email" class="form-control" id="email" placeholder="email">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">User Password</label>
    <input type="text" name="password" class="form-control" id="password" placeholder="password">
  </div>
  <div class="mb-3">
    <label for="confirmPassword" class="form-label">Confirm Password</label>
    <input type="password" name="confirmPassword" class="form-control" id="confirmPassword" placeholder="password">
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
  <span>Go to the login page <b id="logBtn">LOGIN</b></span>
</form>
    `;
};
