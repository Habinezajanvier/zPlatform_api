/**
 * @openapi
 * components:
 *  schemas:
 *      Document:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              uri:
 *                  type: string
 *                  format: uri
 *              name:
 *                  type: string
 *              accepted:
 *                  type: string
 *              ownerId:
 *                  type: integer
 *              owner:
 *                  $ref: '#/components/schemas/User'
 *                  description: Owner of the document
 *
 */
