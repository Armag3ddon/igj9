using UnityEngine;
using System.Collections;

public class TextMovement : MonoBehaviour {

    public float moveSpeed = 75f;

    private Vector2 input;
    private bool isMoving = false;
    private float factor;
    private int lockX = 0;
    private int lockY = 0;
    private Animation animationCommand = null;
    //CharacterController controller = null;

    void Start()
    {
        animationCommand = gameObject.GetComponent<Animation>();
        //controller = GetComponent<CharacterController>();
        
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject != null)
        {
            if (input.x > 0)
            {
                lockX = 1;
            }
            else if (input.x < 0)
            {
                lockX = -1;
            }

            if (input.y > 0)
            {
                lockY = 1;
            }
            else if (input.y < 0)
            {
                lockY = -1;
            }
        }
    }

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

            if (input.x > 0 && lockX < 1)
            {
                transform.position += transform.right * moveSpeed * Time.deltaTime * factor;
                lockX = 0;
            }
            else if (input.x < 0 && lockX > -1)
            {
                transform.position += -1f * transform.right * moveSpeed * Time.deltaTime * factor;
                lockX = 0;
            }

            if (input.y > 0 && lockY < 1)
            {
                transform.position += transform.up * moveSpeed * Time.deltaTime * factor;
                lockY = 0;
            }
            else if (input.y < 0 && lockY > -1)
            {
                transform.position += -1f * transform.up * moveSpeed * Time.deltaTime * factor;
                lockY = 0;
                animationCommand.Play("main_character_walk_south");
                Debug.Log("");

            }
        }
    }

    void OnCollisionExit2D (Collision2D collision)
    {
        lockX = 0;
        lockY = 0;
    }
        //endPosition = new Vector3(startPosition.x + System.Math.Sign(input.x) * gridSize,
        //  startPosition.y + System.Math.Sign(input.y) * gridSize, startPosition.z);

}
