import AsyncStorage from '@react-native-community/async-storage';
export const getPaymentStatus = async () =>  {
    try {
        const value = await AsyncStorage.getItem('PaymentStatus');
        if (value !== null) {
          return value;
        }
        else
        { const Free="Free"
            return JSON.stringify (Free);
        }
      } catch (error) {
        return '';
      }
};

/**
     * @description Save User Id
     * @param {String} value.
     * @returns {Boolean}
     * @author Sagar Dhake
*/

export const savePaymentStatus = async (value) => {
    try {
        await AsyncStorage.setItem('PaymentStatus', value);
        return true;
      } catch (error) {
        return false;
      }
};

export const getUserName = async () =>  {
    try {
        const value = await AsyncStorage.getItem('Username');
        if (value !== null) {
          return value;
        }
        else
        {
            return 'Username';
        }
      } catch (error) {
        return '';
      }
};

/**
     * @description Save User Id
     * @param {String} value.
     * @returns {Boolean}
     * @author Sagar Dhake
*/

export const saveUserName = async (value) => {
    try {
        console.log(value)
        await AsyncStorage.setItem('Username', value);
        
        return true;
      } catch (error) {
        return false;
      }
};

export const getName = async () =>  {
    try {
        const value = await AsyncStorage.getItem('name');
        if (value !== null) {
          return value;
        }
        else
        {
            return 'name';
        }
      } catch (error) {
        return '';
      }
};

/**
     * @description Save User Id
     * @param {String} value.
     * @returns {Boolean}
     * @author Sagar Dhake
*/

export const saveName = async (value) => {
    try {
        console.log(value)
        await AsyncStorage.setItem('name', value);
        return true;
      } catch (error) {
        return false;
      }
};

export const getMobile = async () =>  {
    try {
        const value = await AsyncStorage.getItem('Mobile');
        if (value !== null) {
          return value;
        }
        else
        {
            return '1234567890';
        }
      } catch (error) {
        return '';
      }
};

/**
     * @description Save User Id
     * @param {String} value.
     * @returns {Boolean}
     * @author Sagar Dhake
*/

export const saveMobile = async (value) => {
    try {
        console.log(value)
        await AsyncStorage.setItem('Mobile', value);
        return true;
      } catch (error) {
        return false;
      }
};

export const getEmail = async () =>  {
    try {

        const value = await AsyncStorage.getItem('email');
        if (value !== null) {
          return value;
        }
        else
        {
            return 'free';
        }
      } catch (error) {
        return '';
      }
};

/**
     * @description Save User Id
     * @param {String} value.
     * @returns {Boolean}
     * @author Sagar Dhake
*/

export const saveEmail = async (value) => {
    try {
        console.log(value)
        await AsyncStorage.setItem('email', value);
        return true;
      } catch (error) {
        return false;
      }
};

export const getUserState = async () =>  {
    try {
        const value = await AsyncStorage.getItem('UserState');
        if (value !== null) {
          return value;
        }
        else
        {
            return '0';
        }
      } catch (error) {
        return '';
      }
};

/**
     * @description Save User Id
     * @param {String} value.
     * @returns {Boolean}
     * @author Sagar Dhake
*/

export const saveUserState = async (value) => {
    try {
        await AsyncStorage.setItem('UserState', value);
        return true;
      } catch (error) {
        return false;
      }
};

