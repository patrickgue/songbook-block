<?php
/**
 * Plugin Name:       Songbook Block
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.0.1
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Author:            Patrick Günthard
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       songbook-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_songbook_block_block_init() {
	register_block_type( __DIR__ . '/build/songbook-block' );
}
add_action( 'init', 'create_block_songbook_block_block_init' );
