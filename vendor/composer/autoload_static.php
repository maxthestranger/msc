<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit59077c1ec4ba7aa153b213241d362e3d
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Msc\\App\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Msc\\App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit59077c1ec4ba7aa153b213241d362e3d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit59077c1ec4ba7aa153b213241d362e3d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit59077c1ec4ba7aa153b213241d362e3d::$classMap;

        }, null, ClassLoader::class);
    }
}
