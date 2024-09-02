export const renderLogin = () => {
  return `
    <form id="login" class="w-50 middleDisplay ">
    <p><strike>Login If you have an account</strike></p>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" name="password" class="form-control" id="password">
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
  <span>Go to the signup page <b id="signBtn">SIGNUP</b></span>
</form>
    `;
};
