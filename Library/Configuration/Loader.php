<?php
/**
 * @author    Cyrille Mahieux <elijaa(at)free.fr>
 * @copyright Copyright (c) 2010-2015, Cyrille Mahieux
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 * @package   phpMemcachedAdmin
 */

/**
 * Configuration class for editing, saving, ...
 *
 * @since 19/05/2010
 */
class Library_Configuration_Loader
{
    # Singleton
    protected static $_instance = null;

    # Configuration file
    protected static $_iniPath = './Config/Memcache.php';

    # Configuration needed keys
    protected static $_iniKeys = array('stats_api',
                                       'slabs_api',
                                       'items_api',
                                       'get_api',
                                       'set_api',
                                       'delete_api',
                                       'flush_all_api',
                                       'connection_timeout',
                                       'max_item_dump',
                                       'refresh_rate',
                                       'memory_alert',
                                       'hit_rate_alert',
                                       'eviction_alert',
                                       'file_path',
                                       'servers');

    protected static $_iniStdArray = array (
        'stats_api' => 'Server',
        'slabs_api' => 'Server',
        'items_api' => 'Server',
        'get_api' => 'Server',
        'set_api' => 'Server',
        'delete_api' => 'Server',
        'flush_all_api' => 'Server',
        'connection_timeout' => '1',
        'max_item_dump' => '100',
        'refresh_rate' => 2,
        'memory_alert' => '80',
        'hit_rate_alert' => '90',
        'eviction_alert' => '0',
        'file_path' => 'Temp/',
        'servers' =>
        array (
            'Default' =>
            array (
                '127.0.0.1:11211' =>
                array (
                    'hostname' => '127.0.0.1',
                    'port' => '11211',
                ),
            ),
        ),
    );

    # Storage
    protected static $_ini = array();

    /**
     * Constructor, load configuration file and parse server list
     *
     * @return Void
     */
    protected function __construct()
    {
        # Opening ini file
        if ( file_exists( self::$_iniPath ) ) {
            self::$_ini = require self::$_iniPath;
        } else {
            self::$_ini = self::$_iniStdArray;
        }
    }

    /**
     * Get Library_Configuration_Loader singleton
     *
     * @return Library_Configuration_Loader
     */
    public static function singleton()
    {
        if(!isset(self::$_instance))
        {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Config key to retrieve
     * Return the value, or false if does not exists
     *
     * @param String $key Key to get
     *
     * @return Mixed
     */
    public function get($key)
    {
        if(isset(self::$_ini[$key]))
        {
            return self::$_ini[$key];
        }
        return false;
    }

    /**
     * Servers to retrieve from cluster
     * Return the value, or false if does not exists
     *
     * @param String $cluster Cluster to retreive
     *
     * @return Array
     */
    public function cluster($cluster)
    {
        if(isset(self::$_ini['servers'][$cluster]))
        {
            return self::$_ini['servers'][$cluster];
        }
        return array();
    }

    /**
     * Check and return server data
     * Return the value, or false if does not exists
     *
     * @param String $server Server to retreive
     *
     * @return Array
     */
    public function server($server)
    {
        foreach(self::$_ini['servers'] as $cluster => $servers)
        {
            if(isset(self::$_ini['servers'][$cluster][$server]))
            {
                return self::$_ini['servers'][$cluster][$server];
            }
        }
        return array();
    }

    /**
     * Config key to set
     *
     * @param String $key Key to set
     * @param Mixed $value Value to set
     *
     * @return Boolean
     */
    public function set($key, $value)
    {
        self::$_ini[$key] = $value;
    }

    /**
     * Return actual ini file path
     *
     * @return String
     */
    public function path()
    {
        return self::$_iniPath;
    }

    /**
     * Check if every ini keys are set
     * Return true if ini is correct, false otherwise
     *
     * @return Boolean
     */
    public function check()
    {
        # Checking configuration keys
        foreach(self::$_iniKeys as $iniKey)
        {
            # Ini file key not set
            if(!isset(self::$_ini[$iniKey]))
            {
                return false;
            }
        }
        return true;
    }

    /**
     * Write ini file
     * Return true if written, false otherwise
     *
     * @return Boolean
     */
    public function write()
    {
        if($this->check())
        {
            return is_numeric(file_put_contents(self::$_iniPath, '<?php' . PHP_EOL . 'return ' . var_export(self::$_ini, true) . ';'));
        }
        return false;
    }
}