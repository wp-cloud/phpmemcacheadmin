<?php
/**
 * @author    Cyrille Mahieux <elijaa(at)free.fr>
 * @copyright Copyright (c) 2010-2015, Cyrille Mahieux
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 * @package   phpMemcachedAdmin
 */

/**
 * Error container
 *
 * @since 11/10/2010
 */
class Library_Data_Error
{
    private static $_errors = array();

    /**
     * Add an error to the container
     * Return true if successful, false otherwise
     *
     * @param String $error Error message
     *
     * @return Boolean
     */
    public static function add($error)
    {
        return array_push(self::$_errors, $error);
    }

    /**
     * Return last Error message
     *
     * @return Mixed
     */
    public static function last()
    {
        return (isset(self::$_errors[count(self::$_errors) - 1])) ? self::$_errors[count(self::$_errors) - 1] : null;
    }

    /**
     * Return errors count
     *
     * @return Integer
     */
    public static function count()
    {
        return count(self::$_errors);
    }
}