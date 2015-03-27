<?php
/**
 * @author    Cyrille Mahieux <elijaa(at)free.fr>
 * @copyright Copyright (c) 2010-2015, Cyrille Mahieux
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 * @package   phpMemcachedAdmin
 */

/**
 * Version container
 *
 * @since 24/08/2011
 */
class Library_Data_Version
{
    # Version file
    protected static $_file = 'latest';

    # Google Code latest version data file
    protected static $_latest = '';

    # Time between HTTP check
    protected static $_time = 1296000; # 15 days

    /**
     * Check for the latest version, from local cache or via http
     * Return true if a newer version is available, false otherwise
     *
     * @return Boolean
     */
    public static function check()
    {
        # Loading ini file
        $_ini = Library_Configuration_Loader::singleton();

        # Version definition file path
        $path = rtrim($_ini->get('file_path'), '/') . DIRECTORY_SEPARATOR . self::$_file;

        # Checking if file was modified for less than 15 days ago
        if((is_array($stats = @stat($path))) && (isset($stats['mtime'])) && ($stats['mtime'] > (time() - self::$_time)))
        {
            # Opening file and checking for latest version
            return (version_compare(CURRENT_VERSION, file_get_contents($path)) == -1);
        }
        else
        {
            # Getting last version
			/**
			 * @todo Get latest tag/release via GitHub API
			 */
            if($latest = @file_get_contents(self::$_latest))
            {
                # Saving latest version in file
                file_put_contents($path, $latest);

                # Checking for latest version
                return (version_compare(CURRENT_VERSION, $latest) == -1);
            } else {
                # To avoid error spam
                file_put_contents($path, 'Net unreachable');
                return true;
            }
        }
    }
}