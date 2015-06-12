module Honeydew
{
    export class String
    {
        /**
         * Capitalize first character of a string
         *
         * @param string
         * @returns {string}
         */
        public static ucfirst(string):string
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /**
         * Check if string contains other string
         *
         * @param string1
         * @param string2
         * @returns {boolean}
         */
        public static contains(string1, string2):boolean
        {
            return (string1.indexOf(string2) > -1);
        }
    }
}
