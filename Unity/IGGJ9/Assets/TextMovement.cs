using UnityEngine;
using System.Collections;

public class TextMovement : MonoBehaviour {

    public float moveSpeed = 10f;

    private Vector2 input;
    private bool isMoving = false;
    private float factor;

    public void FixedUpdate()
    {
        input = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
           
        if (input != Vector2.zero)
        {
            if (input.x != 0 && input.y != 0)
            {
                factor = 0.7071f;
            }
            else
            {
                factor = 1f;
            }

            if (input.x > 0)
            {
                transform.position += transform.right * moveSpeed * Time.deltaTime * factor;
            }
            else if (input.x < 0)
            {
                transform.position += -1f * transform.right * moveSpeed * Time.deltaTime * factor;
            }

            if (input.y > 0)
            {
                transform.position += transform.up * moveSpeed * Time.deltaTime * factor;
            }
            else if (input.y < 0)
            {
                transform.position += -1f * transform.up * moveSpeed * Time.deltaTime * factor;
            }

        }
    }
        //endPosition = new Vector3(startPosition.x + System.Math.Sign(input.x) * gridSize,
        //  startPosition.y + System.Math.Sign(input.y) * gridSize, startPosition.z);

}
