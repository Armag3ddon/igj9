using UnityEngine;
using System.Collections;

public class Test : MonoBehaviour {

    GameControllerSingleton gc = null;

    // Use this for initialization
    void Start () {
        gc = GameControllerSingleton.Instance.GetComponent<GameControllerSingleton>();

        Debug.Log(gc.GetTestNumber());
     
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
