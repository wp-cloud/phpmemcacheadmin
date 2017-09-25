<?php
/**
 * @author    WP-Cloud <code@wp-cloud.de>
 * @copyright Copyright (c) 2015-2017 WP-Cloud
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 * @package   phpMemcachedAdmin
 */

/**
 * Factory for communication with Memcache Server
 *
 * @since 30/03/2010
 */
class Library_Command_Factory
{
    private static $_object = array();

    # No explicit call of constructor
    private function __construct() {}

    # No explicit call of clone()
    private function __clone() {}

    /**
     * Accessor to command class instance by command type
     *
     * @param String $command Type of command
     *
     * @return void
     */
    public static function instance($command)
    {
        # Importing configuration
        $_ini = Library_Configuration_Loader::singleton();

        # Instance does not exists
        if(!isset(self::$_object[$_ini->get($command)]) || ($_ini->get($command) != 'Server'))
        {
            # Switching by API
            switch($_ini->get($command))
            {
                case 'Memcache':
                    # PECL Memcache API
                    self::$_object['Memcache'] = new Library_Command_Memcache();
                    break;

                case 'Memcached':
                    # PECL Memcached API
                    self::$_object['Memcached'] = new Library_Command_Memcached();
                    break;

                case 'Server':
                default:
                    # Server API (eg communicating directly with the memcache server)
                    self::$_object['Server'] = new Library_Command_Server();
                    break;
            }
        }
        return self::$_object[$_ini->get($command)];
    }

    /**
     * Accessor to command class instance by type
     *
     * @param String $api Type of command
     *
     * @return void
     */
    public static function api($api)
    {
        # Instance does not exists
        if(!isset(self::$_object[$api]) || ($api != 'Server'))
        {
            # Switching by API
            switch($api)
            {
                case 'Memcache':
                    # PECL Memcache API
                    self::$_object['Memcache'] = new Library_Command_Memcache();
                    break;

                case 'Memcached':
                    # PECL Memcached API
                    self::$_object['Memcached'] = new Library_Command_Memcached();
                    break;

                case 'Server':
                default:
                    # Server API (eg communicating directly with the memcache server)
                    self::$_object['Server'] = new Library_Command_Server();
                    break;
            }
        }
        return self::$_object[$api];
    }
}