<?php
/**
 * @author    Cyrille Mahieux <elijaa(at)free.fr>
 * @copyright Copyright (c) 2010-2015, Cyrille Mahieux
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 * @package   phpMemcachedAdmin
 */
while(true)
{
    $handle = fsockopen('127.0.0.1', 11211, $errno, $errstr, 2);
    for($i = rand(0, 200) ; $i < 300 ; $i++)
    {
        fwrite($handle, 'set ' . md5(microtime(true) . rand(0, 250000000)) . ' 0 18000 10' . "\r\n");
        fwrite($handle, 'aaaaaaaaaa' . "\r\n");
    }
    usleep(rand(0, 10000));
    set_time_limit(5);
	//sleep(rand(0,10));
}