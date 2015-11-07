using UnityEngine;
using System.Collections;

public class GameControllerSingleton : MonoBehaviour {

    private static GameControllerSingleton _instance = null;

    public static GameControllerSingleton Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = GameObject.FindObjectOfType(typeof(GameControllerSingleton)) as GameControllerSingleton;
            }

            return _instance;
        }
    }

    void Awake()
    {
        _instance = this;
    }

    public int GetTestNumber()
    {
        return 2;
    }
}
