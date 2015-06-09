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
        public static ucfirst(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}
