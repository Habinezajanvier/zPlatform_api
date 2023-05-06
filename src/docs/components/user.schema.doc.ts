/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *                  format: email
 *              emailVerified:
 *                  type: boolean
 *              profile:
 *                  type: string
 *                  format: uri
 *              dob:
 *                  type: string
 *                  format: date-time
 *              gender:
 *                  type: string
 *              maritalStatus:
 *                  type: string
 *              clientId:
 *                  type: string
 *              documents:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Document'
 *              lastLogin:
 *                  type: string
 *                  format: date
 *              otp:
 *                  type: number
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *
 *      UserCreationSuccess:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  examples: User created successfuly
 *              data:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      firsname:
 *                          type: string
 *                      lastname:
 *                          type: string
 *                      email:
 *                          type: string
 *
 *      Error:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  examples: Something went wrong, try again later
 *
 */
