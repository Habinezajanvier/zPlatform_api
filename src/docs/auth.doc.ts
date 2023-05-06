/**
 * @swagger
 * /auth/signup:
 *    post:
 *         tags: [Authentication]
 *         summary:  Create new account
 *         description: Allow a user create an account using his/her email and password
 *
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstname:
 *                                  type: string
 *                              lastname:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *         responses:
 *              '201':
 *                  description: Object of created user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserCreationSuccess'
 *              '409':
 *                  description: Email in use
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *              '400':
 *                  description: Email is invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *
 *
 * /auth/verify:
 *    get:
 *         tags: [Authentication]
 *         summary:  Verify email
 *         description: Allow user to verify his/her email upon successful registration
 *
 *         parameters:
 *           - in: query
 *             name: token
 *             schema:
 *               type: string
 *             required: true
 *         responses:
 *              '200':
 *                  description: Email verified successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserCreationSuccess'
 *
 *              '404':
 *                  description: User does not exist
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *
 * /auth/login:
 *    post:
 *         tags: [Authentication]
 *         summary:  Login
 *         description: Allow a user to login with his/her email and password
 *
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *         responses:
 *              '200':
 *                  description: Loged successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserCreationSuccess'
 *
 *              '403':
 *                  description: Email or Password is invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *
 * /auth/login/otp:
 *    post:
 *         tags: [Authentication]
 *         summary:  Login with OTP
 *         description: Allow a user to login with with otp if device is new
 *
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              otp:
 *                                  type: string
 *         responses:
 *              '200':
 *                  description: Loged successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserCreationSuccess'
 *
 *              '403':
 *                  description: Incorrect Otp
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *
 * /auth/forget:
 *    post:
 *         tags: [Authentication]
 *         summary:  Forget password
 *         description: Allow user to hit forget password for reset
 *
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *         responses:
 *              '200':
 *                  description: Successfully sent email of reset password
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *
 *              '404':
 *                  description: No user found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *
 * /auth/reset:
 *    put:
 *         tags: [Authentication]
 *         summary:  Reset password
 *         description: Allow user to reset password once forgotten
 *
 *         parameters:
 *           - in: query
 *             name: token
 *             schema:
 *               type: string
 *             required: true
 *         requestBody:
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              password:
 *                                  type: string
 *         responses:
 *              '200':
 *                  description: Email verified successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserCreationSuccess'
 *
 *              '404':
 *                  description: User does not exist
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 */
