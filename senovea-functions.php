<?php

/* * * * * * * *

    Plugin Name: Senovea Functions 
    Description: Functions Senovea custom plugin
    Author: Brauperle
    Version: 1.0.0
    Copyright: © 2012 Senovea Corp (email : developer@senovea.com)
    License: GNU General Public License v3.0
    License URI: http://www.gnu.org/licenses/gpl-3.0.html

* * * * * * * * */

/* *
 *
 * 1. SETTINGS
 * All the general settings for senovea
 * 
 * 2. SENOVEA CUSTOM FUNCTIONS
 * All the custom functions needed for senovea
 * 
 * 3. SENOVEA API
 * All the function associated with the senovea custom API
 * 
 * 4. SENOVEA CUSTOM UI
 * All function to build the custom senovea admin UI
 * 
 * 5. SENOVEA EXISTING FUNCTIONNAL HOOKS
 * All the existing hooks we need to plug into for senovea
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* *
 * 1. SETTINGS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/* *
 *  Enable CORS for wordpress
 * * */

function my_customize_rest_cors() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *' ); //  indicates whether the response can be shared with resources with the given origin.
		header( 'Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD' ); // specifies the method or methods allowed when accessing the resource in response to a preflight request.
        //header( 'Access-Control-Allow-Credentials: true' ); // indicates whether or not the response to the request can be exposed to the page. It can be exposed when the true value is returned.
        //header( 'Access-Control-Allow-Headers: X-PINGOTHER, Content-Type' ); // is used in response to a preflight request to indicate which HTTP headers can be used during the actual request.
        //header( 'Access-Control-Allow-Headers: X-Requested-With' );
		//header( 'Access-Control-Expose-Headers: Link', false );
		return $value;
	} );
}
add_action( 'rest_api_init', 'my_customize_rest_cors', 15 );

/* *
 *  Extend jwt_auth plugin to throw user id in token response
 * * */

function jwt_auth_id_in_response($data, $user){
    $response = $data;
    $response['user_id'] = $user->get('id');
    $response['user_roles'] = get_userdata($user->get('id'))->roles;
    return $response;
};
add_filter('jwt_auth_token_before_dispatch', 'jwt_auth_id_in_response', 10, 2);

// PHP wrapper woocommerce API
require __DIR__ . '/vendor/autoload.php';
use Automattic\WooCommerce\Client;
function woocommerce_api_v2(){

    // prod
    return new Client(
        'https://senovea.juliengrelet.com', 
        'ck_1d8e289f4b323b4bb0b39de15e2d54c66379dfaf', 
        'cs_fc7e3df90d1ab2144b1a15f0e5ec8d8218fdba73',
        [
            'wp_api' => true,
            'version' => 'wc/v2',
            'query_string_auth' => true
        ]
    );

    // dev ( lilian )
    /*return new Client(
        'http://senoveawp.local', 
        'ck_e15b9bd708a0d00681f613d499131b2799d6e0ce', 
        'cs_1435e3021d0eedccf1dba1d981b2089593ab508f',
        [
            'wp_api' => true,
            'version' => 'wc/v2',
        ]
    );*/
    
}

/* *
 * 2. SENOVEA CUSTOM FUNCTIONS
 * All the custom functions needed for senovea
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

 // Passwords 
 function globalRandomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}



// Paniers
// * * * * * * * * * * * * * * * * * * * * * *
// https://wordpress.stackexchange.com/questions/218715/fatal-error-call-to-undefined-function-post-exists
// https://www.advancedcustomfields.com/resources/query-posts-custom-fields/
function get_panier( $params ){
    $response = array();
    $response['status'] = "";
    //$response['params'] = $params;
    $user_id = $params['id'];

    $args = array(
        'numberposts'	=> -1,
        'post_type'		=> 'table_panier',
        'meta_key'		=> 'panier_customer',
        'meta_value'	=> $user_id
    );
    $user_paniers = get_posts($args);
    //$response['paniers_raw'] = $user_paniers;

    if( !empty($user_paniers) ){

        $user_paniers_formatted = array();
        foreach($user_paniers as $user_panier){
            $panier = array();
            
            $panier["id"] = $user_panier->ID;
            $panier["nicename"] = get_field('field_5b358276d77b9', $user_panier->ID);
            $panier["status"] = get_field('field_5b38288418eea', $user_panier->ID);
            $panier["arrondissement"] = get_field('field_5b3582ecd77bb', $user_panier->ID);
            $panier["adresse"] = get_field('field_5b3582c1d77ba', $user_panier->ID);
            $panier["message"] = get_field('field_5b3583108667e', $user_panier->ID);
            $panier["code_postal"] = get_field('field_5b3786ae0fa85', $user_panier->ID);

            // Les lots 
            $lots = get_field('field_5b358331cbd8a', $user_panier->ID);
            error_log(print_r($lots,TRUE));
            $panier["lots"] = $lots;

            $user_paniers_formatted[$user_panier->ID] = $panier;
        }
        $response['status'] = "success";
        $response['data'] = $user_paniers_formatted;
        return $response;

    }else{
        $response['status'] = "success";
        $response['data'] = [];
        return $response;
    }
    
}

function add_panier( $panier_infos ){
    $response = array(
        "params"=>$panier_infos
    );

    $user_id = $panier_infos['user_id'];
    
    $panier_name = $panier_infos['panier_nom'];
    $panier_name_formatted = str_replace(' ', '', strtolower($panier_name));
    //$response['panier_name_formatted'] = $panier_name_formatted;
    
    $panier_code = $panier_infos['panier_code'];
    $panier_adresse = $panier_infos['panier_adresse'];
    $panier_arrondissement = $panier_infos['panier_arrondissement'];

    //Utiliser admin function 
    require_once( ABSPATH . 'wp-admin/includes/post.php' );
    // Vérifier si le user à déjà un panier avec ce nom
    $post_panier_name = $user_id."_".$panier_name_formatted;
    //$response['post_panier_name'] = $post_panier_name;   

    if( post_exists( $post_panier_name ) != 0 ){

        error_log('panier existe');
        // Renvoyer error
        $response['status'] = "error";
        $response['data'] = "ce user à déjà un panier avec le même nom";
        return $response;
        
    }else{

        error_log('panier n\'existe pas');
        // Ajouter le panier 
        $panier_id = wp_insert_post([
            "post_type"=>"table_panier",
            "post_title"=>$post_panier_name,
            "post_status"=>"publish"
        ]);
        // Update ACF panier
        update_field('field_5b358a821450d',$user_id,$panier_id);
        update_field('field_5b358276d77b9',$panier_name,$panier_id);
        update_field('field_5b38288418eea',"not sended",$panier_id);
        update_field('field_5b3582ecd77bb',$panier_arrondissement,$panier_id);
        update_field('field_5b3786ae0fa85',$panier_code,$panier_id);
        update_field('field_5b3582c1d77ba',$panier_adresse,$panier_id);

        // Renvoyer les paniers 
        $all_paniers_raw = get_posts([
            "post_type"=>"table_panier",
            "numberposts"=>-1,
            'meta_key'		=> 'panier_customer',
            'meta_value'	=> $user_id
        ]);

        if( !empty($all_paniers_raw) ){

        $all_paniers_formated = array();
        foreach($all_paniers_raw as $paniers_raw){
            $panier = array();
            $panier["id"] = $paniers_raw->ID;
            $panier["nicename"] = get_field('field_5b358276d77b9', $paniers_raw->ID);
            $panier["status"] = get_field('field_5b38288418eea', $paniers_raw->ID);
            
            $panier["lots"] = array();
            // Les lots 
            $lots = get_field('field_5b358331cbd8a', $paniers_raw->ID);
            error_log(print_r($lots,TRUE));
            $panier["lots"] = $lots;
            
            $all_paniers_formated[$paniers_raw->ID] = $panier;
        }

        $response['status'] = "success";
        $response['data'] = $all_paniers_formated;
        $response['new_panier_id'] = $panier_id;
        return $response;

        }else{
            $response['status'] = "success";
            $response['data'] = [];
            return $response;
        }

    }
} 

function add_product_to_panier( $params ){

    $response = array();
    //$response['params'] = $params;

    $user_id = $params['user_id'];
    $panier_id = $params['panier_id'];
    $product_id = $params['product_id'];
    $lot_id = $params['lot_id'];

    // on récupère le bon panier 
    $panier = get_post($panier_id);
    //$response['bonpanier'] = $panier;

    // on récupère le produit 
    $product = get_post($product_id);
    //$response['bonproduct'] = $product;

    $panier_lots_rows = get_field('field_5b358331cbd8a', $panier_id);
    //error_log($panier_lots_rows);

    if($panier_lots_rows){
        // inside lots 
        //error_log(print_r($panier_lots_rows,TRUE));
        $all_panier_lot_id = array_column($panier_lots_rows, 'panier_lot_id');
        //error_log(print_r($all_panier_lot_id,TRUE));
        // si le lot existe déjà 
        if( in_array( intval($lot_id) , $all_panier_lot_id ) ){
            // existe
            // si le lot existe on update le lot et on update l'item
            // error_log('existe');

            foreach( $panier_lots_rows as $panier_lots_row_key => $panier_lots_row_value ){
                if( intval($panier_lots_row_value['panier_lot_id']) == intval($lot_id) ){
                    add_sub_row( array('field_5b358331cbd8a', $panier_lots_row_key + 1, 'field_5b358368cbd8b'), ['field_5b3583b3cbd8c'=>$product_id], $panier_id );
                }
            }
        }else{
            // existe pas 
            // si le lot existe pas on ajoute le lot + on rentre l'item
            // error_log('existepas');
            $new_panier_lots_row = [
                'field_5b3583ec8f01a'=>$lot_id,
                'field_5b3584ee7cb3f'=>"not sended"
            ];
            add_row( "field_5b358331cbd8a", $new_panier_lots_row, $panier_id );
            
            $new_panier_lots_rows = get_field('field_5b358331cbd8a', $panier_id);
            foreach( $new_panier_lots_rows as $panier_lots_row_key => $panier_lots_row_value ){
                if( intval($panier_lots_row_value['panier_lot_id']) == intval($lot_id) ){
                    add_sub_row( array('field_5b358331cbd8a', $panier_lots_row_key + 1, 'field_5b358368cbd8b'), ['field_5b3583b3cbd8c'=>$product_id], $panier_id );
                }
            }        
        }
    }else{
            // existe pas 
            // si le lot existe pas on ajoute le lot + on rentre l'item
            // error_log('nada');
            $new_panier_lots_row = [
                'field_5b3583ec8f01a'=>$lot_id,
                'field_5b3584ee7cb3f'=>"not sended"
            ];
            add_row( "field_5b358331cbd8a", $new_panier_lots_row, $panier_id );
            

            $new_panier_lots_rows = get_field('field_5b358331cbd8a', $panier_id);
            //$all_panier_lot_id = array_column($new_panier_lots_rows, 'panier_lot_id');
            foreach( $new_panier_lots_rows as $panier_lots_row_key => $panier_lots_row_value ){
                if( intval($panier_lots_row_value['panier_lot_id']) == intval($lot_id) ){
                    add_sub_row( array('field_5b358331cbd8a', $panier_lots_row_key + 1, 'field_5b358368cbd8b'), ['field_5b3583b3cbd8c'=>$product_id], $panier_id );
                }
            }
    }

    // On retourne tout 
    // ========================================================

    $args = array(
        'numberposts'	=> -1,
        'post_type'		=> 'table_panier',
        'meta_key'		=> 'panier_customer',
        'meta_value'	=> $user_id
    );
    $user_paniers = get_posts($args);
    //$response['paniers_raw'] = $user_paniers;

    if( !empty($user_paniers) ){

        $user_paniers_formatted = array();
        foreach($user_paniers as $user_panier){
            $panier = array();
            $panier["id"] = $user_panier->ID;
            $panier["nicename"] = get_field('field_5b358276d77b9', $user_panier->ID);
            $panier["status"] = get_field('field_5b38288418eea', $user_panier->ID);

            // Les lots 
            $lots = get_field('field_5b358331cbd8a', $user_panier->ID);
            $panier["lots"] = $lots;

            error_log( $panier["nicename"] );
            error_log(print_r($lots,TRUE));

            $user_paniers_formatted[$user_panier->ID] = $panier;
        }
        $response['status'] = "success";
        $response['data'] = $user_paniers_formatted;
        return $response;

    }else{
        $response['status'] = "success";
        $response['data'] = [];
        return $response;

    }
    
}

// https://stackoverflow.com/questions/36729701/programmatically-creating-new-order-in-woocommerce
// https://gist.github.com/stormwild/7f914183fc18458f6ab78e055538dcf0
function order_panier_response( $params ){

    error_log('order_panier_response');

    $response = array();
    //$response["params"] = $params;
    $panier_id = $params['panier_id'];

    require_once( ABSPATH . 'wp-admin/includes/post.php' );

    // the panier //
    $panier = get_post($panier_id);
    //$response["panier"] = $panier;
    $panier_lots = get_field('field_5b358331cbd8a', $panier_id);
    //$response["panier_lots"] = $panier_lots;
    $panier_customer = get_field('field_5b358a821450d', $panier_id);
    //$response["panier_customer"] = $panier_customer;
    $panier_arrondissement = get_field('field_5b3582ecd77bb', $panier_id);
    //$response["panier_arrondissement"] = $panier_arrondissement;

    // Order creation
    global $woocommerce;

    if( !empty($panier_lots) ){
        foreach( $panier_lots as $lot ){

            // Creation d'une order pour chaque lot
            
            //$newOrder = wc_create_order();
            $newOrder = wc_create_order( array(
                "customer_id"=>$panier_customer['ID']
            ));
            //error_log(print_r($newOrder,TRUE));

            // Ajout de produits par order
            if( !empty($lot['panier_lot_articles']) ){

                $grouped_products = array();
                foreach( $lot['panier_lot_articles'] as $product ){
                    array_push($grouped_products, $product['panier_article_id']);
                }
                $counted_grouped_product = array_count_values( $grouped_products );
                //error_log( print_r($counted_grouped_product,TRUE) ); 
                foreach( $counted_grouped_product as $single_counted_grouped_product_key => $single_counted_grouped_product_value ){
                    $newOrder->add_product( get_product( $single_counted_grouped_product_key ), $single_counted_grouped_product_value);
                }
            }

            // -> Ajout customer infos

            // -> TODO


            // -> Ajouter l'order 

                // UPDATE CUSTOMER

                $customer_associated_orders = get_field('field_5b26fb9963805', "user_".$panier_customer['ID']);
                //error_log(" customer_associated_orders ");
                //error_log(print_r($customer_associated_orders,TRUE));
                $customer_associated_orders_array_ids = array();
                if( !empty($customer_associated_orders) ){
                    foreach( $customer_associated_orders as $customer_associated_order ){
                        array_push($customer_associated_orders_array_ids, $customer_associated_order->ID);
                    }
                }
                array_push($customer_associated_orders_array_ids, $newOrder->get_id());
                update_field('field_5b26fb9963805', $customer_associated_orders_array_ids, "user_".$panier_customer['ID']);

                // UPDATE SUPPLIER 
                
                // fournisseur post name 
                $fournisseur_post_name = $panier_arrondissement."_".$lot['panier_lot_id'];
                // fournisseur post id
                $the_fournisseur_post_id = post_exists( $fournisseur_post_name );

                $fournisseur_one_id = "";
                $fournisseur_two_id = "";
                $fournisseur_three_id = "";

                if( $the_fournisseur_post_id != 0 ){

                    $fournisseur_post = get_post($the_fournisseur_post_id);
                    //error_log(print_r($fournisseur_post,TRUE));
                    //update fournisseur 1 
                    $fournisseur_un = get_field('field_5b3507e5b1121', $the_fournisseur_post_id);
                    $fournisseur_one_id = $fournisseur_un['ID'];
                    //error_log("fournisseur 1");
                    //error_log(print_r($fournisseur_un,TRUE));
                    // fournisseur 1 orders
                    $fournisseur_un_associated_orders = get_field('field_5b26e02560692', "user_".$fournisseur_un['ID']);
                    //error_log("fournisseur 1 orders");
                    //error_log(print_r($fournisseur_un_associated_orders,TRUE));
                    $fournisseur_un_associated_orders_array_ids = array();
                    if( !empty($fournisseur_un_associated_orders) ){
                        foreach( $fournisseur_un_associated_orders as $fournisseur_un_associated_order ){
                            array_push($fournisseur_un_associated_orders_array_ids, $fournisseur_un_associated_order->ID);
                        }
                    }
                    array_push($fournisseur_un_associated_orders_array_ids, $newOrder->get_id());
                    //error_log("fournisseur_un_associated_orders_array_ids");
                    //error_log(print_r($fournisseur_un_associated_orders_array_ids,TRUE));
                    update_field('field_5b26e02560692', $fournisseur_un_associated_orders_array_ids, "user_".$fournisseur_un['ID']);
                    

                    //update fournisseur 2 
                    //$fournisseur_deux = get_field('field_5b350826b1122', $the_fournisseur_post_id);
                    $fournisseur_deux = get_field('field_5b350826b1122', $the_fournisseur_post_id);
                    $fournisseur_two_id = $fournisseur_deux['ID'];
                    //error_log("fournisseur 1");
                    //error_log(print_r($fournisseur_un,TRUE));
                    // fournisseur 1 orders
                    $fournisseur_deux_associated_orders = get_field('field_5b26e02560692', "user_".$fournisseur_deux['ID']);
                    //error_log("fournisseur 1 orders");
                    //error_log(print_r($fournisseur_un_associated_orders,TRUE));
                    $fournisseur_deux_associated_orders_array_ids = array();
                    if( !empty($fournisseur_deux_associated_orders) ){
                        foreach( $fournisseur_deux_associated_orders as $fournisseur_deux_associated_order ){
                            array_push($fournisseur_deux_associated_orders_array_ids, $fournisseur_deux_associated_order->ID);
                        }
                    }
                    array_push($fournisseur_deux_associated_orders_array_ids, $newOrder->get_id());
                    update_field('field_5b26e02560692', $fournisseur_deux_associated_orders_array_ids, "user_".$fournisseur_deux['ID']);
                    
                    //update fournisseur 3
                    //$fournisseur_trois = get_field('field_5b350837b1123', $the_fournisseur_post_id);
                    $fournisseur_trois = get_field('field_5b350837b1123', $the_fournisseur_post_id);
                    $fournisseur_three_id = $fournisseur_trois['ID'];
                    //error_log("fournisseur 1");
                    //error_log(print_r($fournisseur_un,TRUE));
                    // fournisseur 1 orders
                    $fournisseur_trois_associated_orders = get_field('field_5b26e02560692', "user_".$fournisseur_trois['ID']);
                    //error_log("fournisseur 1 orders");
                    //error_log(print_r($fournisseur_un_associated_orders,TRUE));
                    $fournisseur_trois_associated_orders_array_ids = array();
                    if( !empty($fournisseur_trois_associated_orders) ){
                        foreach( $fournisseur_trois_associated_orders as $fournisseur_trois_associated_order ){
                            array_push($fournisseur_trois_associated_orders_array_ids, $fournisseur_trois_associated_order->ID);
                        }
                    }
                    array_push($fournisseur_trois_associated_orders_array_ids, $newOrder->get_id());
                    update_field('field_5b26e02560692', $fournisseur_trois_associated_orders_array_ids, "user_".$fournisseur_trois['ID']);
                    
                }

                // -> Ajout ACF 
                //  $newOrder->get_id()

                // lot 
                update_field('field_5b3d50e73c7d8', $lot['panier_lot_id'], $newOrder->get_id());
                // arrondissement
                update_field('field_5b3d51bf8256b', $panier_arrondissement, $newOrder->get_id());
                // fournisseurs 
                update_field('field_5b26fa0bd28f7', $fournisseur_one_id, $newOrder->get_id());
                update_field('field_5b26fa45005e3', $fournisseur_two_id, $newOrder->get_id());
                update_field('field_5b26fa56005e4', $fournisseur_three_id, $newOrder->get_id());

                // -> Changement du status
                $newOrder->update_status( 'wc-waiting-first' );
        }
    }

    // Panier update
    // Changement du status 
    // ??? ou alors après les envois ???

    // Retour all panier
    // Response pour le front 

    $args = array(
        'numberposts'	=> -1,
        'post_type'		=> 'table_panier',
        'meta_key'		=> 'panier_customer',
        'meta_value'	=> $panier_customer['ID']
    );
    $user_paniers = get_posts($args);

    //error_log("user paniers");
    //error_log(print_r($user_paniers,TRUE));
    
    if( !empty($user_paniers) ){

        $user_paniers_formatted = array();
        foreach($user_paniers as $user_panier){
            $panier = array();
            
            $panier["id"] = $user_panier->ID;
            $panier["nicename"] = get_field('field_5b358276d77b9', $user_panier->ID);
            $panier["status"] = get_field('field_5b38288418eea', $user_panier->ID);
            $panier["arrondissement"] = get_field('field_5b3582ecd77bb', $user_panier->ID);
            $panier["adresse"] = get_field('field_5b3582c1d77ba', $user_panier->ID);
            $panier["message"] = get_field('field_5b3583108667e', $user_panier->ID);
            $panier["code_postal"] = get_field('field_5b3786ae0fa85', $user_panier->ID);

            // Les lots 
            $lots = get_field('field_5b358331cbd8a', $user_panier->ID);
            //error_log(print_r($lots,TRUE));
            $panier["lots"] = $lots;

            $user_paniers_formatted[$user_panier->ID] = $panier;
        }
        $response['status'] = "success";
        $response['data'] = $user_paniers_formatted;
        return $response;

    }else{
        $response['status'] = "success";
        $response['data'] = [];
        return $response;
    }
}

// Product
// * * * * * * * * * * * * * * * * * * * * * *
// https://stackoverflow.com/questions/4345554/convert-php-object-to-associative-array
// https://wordpress.stackexchange.com/questions/120055/woocommerce-create-new-product-and-add-to-cart-on-form-submit
// https://stackoverflow.com/questions/28355770/woocommerce-in-wordpress-return-always-simple-as-product-type
// https://stackoverflow.com/questions/36301254/getting-custom-attributes-from-woocommerce-product
// https://stackoverflow.com/questions/13466898/woocommerce-variations
// https://wordpress.stackexchange.com/questions/150031/retrieve-product-category-name-by-product-category-id-woocommerce
// https://github.com/woocommerce/woocommerce/wiki/wc_get_products-and-WC_Product_Query
// https://stackoverflow.com/questions/45828655/woocommerce-get-products-by-attribute-query
function get_all_products( $user_arrondissement ){

    $response = array();

    $wc_products = wc_get_products(array(
        'limit' => -1,
        'type' => 'variable',
        'tax_query' => array(
            array(
                "taxonomy"=>"pa_arrondissement",
                "field"=>"slug",
                "terms"=> array($user_arrondissement),
                "operator"=>"IN"
            )
        ),
        'return' => 'objects',
    ));

    //$response['products'] = $wc_products;
    //error_log(print_r($wc_products,TRUE));

    $products_global = array(
        "travaux"=>array(),
        "ingenieurie"=>array()
    );
    
    $formatted_products = array();
    $wc_products_array = array();
    $senovea_lots_array = array();

    foreach($wc_products as $wc_product){

        //error_log(print_r($wc_product,TRUE));

        $wc_product_array = (array) $wc_product;
        array_push($wc_products_array, $wc_product_array);

        $formatted_product = array();

        // Général
        $formatted_product['id'] = $wc_product->get_id();
        $formatted_product['name'] = $wc_product->get_name();
        $formatted_product['date_created'] = $wc_product->get_date_created();
        $formatted_product['date_modified'] = $wc_product->get_date_modified();
        $formatted_product['sku'] = $wc_product->get_sku();
        $formatted_product['price'] = $wc_product->get_price();
        $formatted_product['description'] = $wc_product->get_description();

        // Catégorie
        $formatted_product['categories'] = array();
        foreach( $wc_product->get_category_ids() as $categorie_id ){
            $term = get_term_by( 'id', $categorie_id, 'product_cat' );
            array_push($formatted_product['categories'], $term->name);
        }

        // Attributes 
        $product_lots = array();
        $product_arrondissement;

        $formatted_product['attributes'] = array();
        foreach( $wc_product->get_attributes() as $attribute ){
            $attribute_array = array();
            if ( $attribute['is_taxonomy'] ) {
                //error_log($attribute['name']);
                //error_log(print_r($values,TRUE));

                $values = wc_get_product_terms( $wc_product->get_id(), $attribute['name'], array( 'fields' => 'names' ) );
                $attribute_array['attr_name'] = $attribute['name'];
                $attribute_array['attr_value'] = $values;

                if($attribute['name'] == "pa_lot"){
                    array_push($product_lots, $values[0]);
                    array_push($senovea_lots_array, $values[0]);
                }

                if($attribute['name'] == "pa_arrondissement"){
                    $product_arrondissement = $values[0];
                }

            }
            array_push($formatted_product['attributes'], $attribute_array);
        }

        // Variations
        $formatted_product['variations'] = array();
        if ($wc_product->is_type( 'variable' )) {
            $available_variations = $wc_product->get_available_variations();
            foreach ($available_variations as $key => $value) { 
                $variation_single = array();
                $variation_single['variation_id'] = $value['variation_id'];
                $variation_single['variation_attributes'] = $value['attributes'];
                $variation_single['variation_sku'] = $value['sku'];
                $variation_single['variation_price'] = $value['display_price'];
                $variation_single['variation_description'] = $value['variation_description'];

                array_push( $formatted_product['variations'], $variation_single );
            }
        }
        //error_log(print_r($formatted_product, TRUE));

        // Lot infos &
        // Fournisseur R1

        //$formatted_product['fournisseur_r1'] = array();
        $formatted_lots = array(
            "lot_id"=>"",
            "lot_name"=>"",
            "lot_fournisseur_r1"=>array(),
            "lot_products"=>array()
        );
        $table_fournisseur = get_posts([
            "post_type"=>"table_fournisseurs",
            "numberposts"=>-1
        ]);
        foreach($table_fournisseur as $row_fournisseur){
            if( $row_fournisseur->post_title == $product_arrondissement."_".$product_lots[0] ){
                
                $formatted_lots["lot_id"] = get_field('field_5b35087784f1f', $row_fournisseur->ID );
                $formatted_lots["lot_name"] = get_field('field_5b35088f84f20', $row_fournisseur->ID );
                
                // Infos fournisseurs
                $fournisseur_wordpress_fields = get_field('field_5b3507e5b1121', $row_fournisseur->ID );
                $formatted_lots["lot_fournisseur_r1"] = $fournisseur_wordpress_fields;
                
                $supplier_arrondissement = get_field('field_5b34f70d8d326', "user_".$fournisseur_wordpress_fields['ID'] );
                $supplier_organisme = get_field('field_5b34fb74c676f', "user_".$fournisseur_wordpress_fields['ID'] );
                $supplier_contact = get_field('field_5b35701456e2d', "user_".$fournisseur_wordpress_fields['ID'] );
                $supplier_adresse = get_field('field_5b353d8c0e99e', "user_".$fournisseur_wordpress_fields['ID'] );
                $supplier_phone = get_field('field_5b34f7ed549e8', "user_".$fournisseur_wordpress_fields['ID'] );

                $formatted_lots["lot_fournisseur_r1"]['supplier_arrondissement'] = $supplier_arrondissement;
                $formatted_lots["lot_fournisseur_r1"]['supplier_organisme'] = $supplier_organisme;
                $formatted_lots["lot_fournisseur_r1"]['supplier_contact'] = $supplier_contact;
                $formatted_lots["lot_fournisseur_r1"]['supplier_adresse'] = $supplier_adresse;
                $formatted_lots["lot_fournisseur_r1"]['supplier_phone'] = $supplier_phone;
            }
        }


        // The push

        array_push($formatted_products, $formatted_product);
        if( in_array( "Travaux", $formatted_product['categories'] ) ){
            foreach($product_lots as $product_lot){
                if( array_key_exists($product_lot, $products_global["travaux"]) ){
                    //$products_global["travaux"][$product_lot]["lot_id"] = $formatted_lots["lot_id"];
                    //$products_global["travaux"][$product_lot]["lot_name"] = $formatted_lots["lot_name"];
                    //$products_global["travaux"][$product_lot]["lot_fournisseur_r1"] = $formatted_lots["lot_fournisseur_r1"];
                    array_push($products_global["travaux"][$product_lot]["lot_products"], $formatted_product);
                }else{
                    $products_global["travaux"][$product_lot]["lot_id"] = $formatted_lots["lot_id"];
                    $products_global["travaux"][$product_lot]["lot_name"] = $formatted_lots["lot_name"];
                    $products_global["travaux"][$product_lot]["lot_fournisseur_r1"] = $formatted_lots["lot_fournisseur_r1"];
                    $products_global["travaux"][$product_lot]["lot_products"] = [$formatted_product];
                }
            }
        }elseif( in_array( "Ingénieurie", $formatted_product['categories'] ) ){
            foreach($product_lots as $product_lot){
                if( array_key_exists($product_lot, $products_global["ingenieurie"]) ){
                    //$products_global["travaux"][$product_lot]["lot_id"] = $formatted_lots["lot_id"];
                    //$products_global["travaux"][$product_lot]["lot_name"] = $formatted_lots["lot_name"];
                    //$products_global["travaux"][$product_lot]["lot_fournisseur_r1"] = $formatted_lots["lot_fournisseur_r1"];
                    array_push($products_global["ingenieurie"][$product_lot]["lot_products"], $formatted_product);
                }else{
                    $products_global["ingenieurie"][$product_lot]["lot_id"] = $formatted_lots["lot_id"];
                    $products_global["ingenieurie"][$product_lot]["lot_name"] = $formatted_lots["lot_name"];
                    $products_global["ingenieurie"][$product_lot]["lot_fournisseur_r1"] = $formatted_lots["lot_fournisseur_r1"];
                    $products_global["ingenieurie"][$product_lot]["lot_products"] = [$formatted_product];
                }
            }
        }else{
             // nothing
        }
    }
    //$response['products_array'] = $wc_products_array;
    $response['products_formated'] = $formatted_products;

    $response['products_global'] = $products_global;

    //error_log(print_r($formatted_products, TRUE));

    $post_products = get_posts([
        'numberposts'=> -1, // all
        'post_type' => 'product'
    ]);
    //$response['post_products'] = $post_products;

    $post_products_metas = array();
    foreach( $post_products as $post_product ){
        $post_meta = get_post_meta($post_product->ID);
        array_push($post_products_metas, $post_meta);
    }
    //$response['post_products_metas'] = $post_products_metas;

    return $response;
}

// Customer
// * * * * * * * * * * * * * * * * * * * * * *
function add_customer_callback( $request ){

    // get payload 
    $response 	= array();
    
	$files  	= $request->get_file_params();
    $parameters = $request->get_params();
    
    /*
    new_user_data.append('organisme',user_infos.register_organisme)
    new_user_data.append('service',user_infos.register_service)

    new_user_data.append('username',user_infos.register_username)
    new_user_data.append('nom',user_infos.register_nom)
    new_user_data.append('prenom',user_infos.register_prenom)

    new_user_data.append('arrodissement',user_infos.register_arrondissement)
    new_user_data.append('adresse',user_infos.register_adresse)
    new_user_data.append('code',user_infos.register_code)
    new_user_data.append('ville',user_infos.register_ville)

    new_user_data.append('email',user_infos.register_email)
    new_user_data.append('phone',user_infos.register_phone)
    */

    $organisme 	= sanitize_text_field($parameters['organisme']);
	$service 	= sanitize_text_field($parameters['service']);

    $username 	= sanitize_text_field($parameters['username']);
    $nom 	= sanitize_text_field($parameters['nom']);
    $prenom 	= sanitize_text_field($parameters['prenom']);

    $arrodissement 	= sanitize_text_field($parameters['arrodissement']);
    $adresse 	= sanitize_text_field($parameters['adresse']);
    $code 	= sanitize_text_field($parameters['code']);
    $ville 	= sanitize_text_field($parameters['ville']);

    $email 		= sanitize_text_field($parameters['email']);
    $phone 		= sanitize_text_field($parameters['phone']);

    $role		= 'customer';
    
	// Generate random password
	function randomPassword() {
		$alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}
	$password = randomPassword();
	$error = new WP_Error();

        // verify payload 		
		if (empty($username)) {
			$error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
			return $error;
		}
		if (empty($email)) {
			$error->add(401, __("Email field 'email' is required.", 'wp-rest-user'), array('status' => 400));
			return $error;
		}

		// create user
		if( !email_exists($email) ){
			if(  !username_exists($username) ){

				/**
				 * 	create customer
				 */

				$data = [
					'email' => $email, // required
					'first_name' => $prenom,
					'last_name' => $nom,
					'username' => $username, // required
					'password' => $password,
					'billing' => [
                        'first_name' => $prenom,
                        'last_name' => $nom,
						'company' => $organisme,
						'address_1' => $adresse,
						'address_2' => '',
						'city' => $ville,
						'state' => '',
						'postcode' => $code,
						'country' => 'France',
						'email' => $email, // required
						'phone' => $phone
					],
					'shipping' => [
                        'first_name' => $prenom,
                        'last_name' => $nom,
						'company' => $organisme,
						'address_1' => $adresse,
						'address_2' => '',
						'city' => $ville,
						'state' => '',
						'postcode' => $code,
						'country' => 'France',
					]
				];
                $customer = woocommerce_api_v2()->post('customers', $data);
                
                /**
                 *  update ACF customer field
                 */
                update_field('field_5b34e8b26e052',$arrodissement,"user_".$customer->id);
                update_field('field_5b34e99e79a21',$organisme,"user_".$customer->id);
				update_field('field_5b34e9b079a22',$service,"user_".$customer->id);
				update_field('field_5b34e9566fc98',$phone,"user_".$customer->id);


				/**
				 * 	upload customer document
				 */
				// upload document 
				// upload files to wordpress
				// https://premium.wpmudev.org/blog/upload-file-functions/
				// https://codex.wordpress.org/Function_Reference/media_handle_upload
				require_once( ABSPATH . 'wp-admin/includes/image.php' );
				require_once( ABSPATH . 'wp-admin/includes/file.php' );
				require_once( ABSPATH . 'wp-admin/includes/media.php' );
				$attachment_id = media_handle_upload( 'document', 0 );
				// update user ACF document field
				update_field('field_5b161ae42a8af',$attachment_id,"user_".$customer->id);

                /**
                 * Add customer to mailchimp email list 
                 */

                $add_customer_mailchimp_response =  add_customer_mailchimp($customer, $password);

				/**
				 * 	build response
				 */

				$response['code'] = 200;
				$response['message'] = $customer;
				$response['curlmailchimp'] = $add_customer_mailchimp_response;

			}else{
				$error->add(406, __("Username already exists, please find another username", 'wp-rest-user'), array('status' => 400));
				return $error;
			}
		}else{
			$error->add(406, __("Email already exists, please try 'Reset Password'", 'wp-rest-user'), array('status' => 400));
			return $error;
		}
		
    //return new WP_REST_Response($response, 200);
    return $response;

}
function update_customer_callback( $customer_id, $customer_informations ){
    // TODO :: update customer
}
function delete_customer_callback( $customer_id ){
    // TODO :: update customer
}

// Order
// * * * * * * * * * * * * * * * * * * * * * *
function add_order_callback( $customer_id, $product_id ){
    $response = array();
    $new_order = [
		"customer_id" => $customer_id,
		"payment_method"=> "cheque",
		"payment_method_title"=> "Check payments",
		'line_items' => [
			[
				'product_id' => $product_id,
				'quantity' => 1
			]
		]
	];
	$response['new_order'] = $new_order;
	// On create an order 
	$created_order = woocommerce_api()->post( 'orders', $new_order );
	$response['created_order'] = $created_order;
    return $response;
}
function delete_order_callback( $order_id ){
    return( 'delete_order_callback' );
}
function accept_order_callback( $order_id,$supplier_id,$customer_id,$product_id,$mc_campaign_id,$mc_email_id ){
    
    $response = array();
    $response['status'] = "";
    $response['message'] = "";

    // Récupération data 

    // Order & Status
    $order = wc_get_order( $order_id );
    $order_status = $order->get_status();

    // Supplier Fournisseurs 

    $order_fournisseur_r1 = get_field('field_5b26fa0bd28f7', $order_id);
    $order_fournisseur_r2 = get_field('field_5b26fa45005e3', $order_id);
    $order_fournisseur_r3 = get_field('field_5b26fa56005e4', $order_id);

    // Supplier position 

    $position;
    if( $order_fournisseur_r1['ID'] == $supplier_id ){
        $position  = 1;
    }elseif( $order_fournisseur_r2['ID'] == $supplier_id ){
        $position  = 2;
    }elseif( $order_fournisseur_r3['ID'] == $supplier_id ){
        $position  = 3;
    }else{

    }

    // Supplier ID
    /*$supplier = get_user_by('id', $supplier_id);
    $supplierID = $supplier->ID;
    error_log(print_r($supplier,TRUE));*/

    $order_new_status;

	switch ( $position ) {
        case 1:
            if( $order_status == "waiting-first" ){
                $order_new_status = ['status' => 'accepted-first'];
                
                //woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $order->update_status( 'wc-accepted-first' );

                $response['status'] = "success";
                $response['message'] = "status changed form waiting-first to accepted-first";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 2:
            if( $order_status == "waiting-second" ){
			    $order_new_status = ['status' => 'accepted-second'];
                
                //woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $order->update_status( 'wc-accepted-second' );

                $response['status'] = "success";
                $response['message'] = "status changed form waiting-second to accepted-second";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 3:
            if( $order_status == "waiting-third" ){
			    $order_new_status = ['status' => 'accepted-third'];
                
                //woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $order->update_status( 'wc-accepted-third' );

                $response['status'] = "success";
                $response['message'] = "status changed form waiting-third to accepted-third";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
		default:
		break;
    }    
    
    // Product
    // $product = get_post($product_id);
    // Customer 
    // $customer = get_user_by('id',$customer_id);
    // Supplier 
    // $supplier = get_user_by('id',$supplier_id);    
    
    // Get position 
    /*$all_rel_suppliers_products = get_posts([
        'numberposts'=> -1, // all
        'post_type' => 'rel_supp_products'
    ]);
    $position = "";
    foreach( $all_rel_suppliers_products as $single_rel ){
        $single_rel_meta = get_post_meta( $single_rel->ID );
        //error_log(print_r($single_rel_meta,TRUE));

        //field_5b2fa5dbe1d3f -> supplier
        $rel_supplier_id= get_field('field_5b2fa5dbe1d3f', $single_rel->ID);
        //field_5b2fa611e1d40 -> product
        $rel_product_id = get_field('field_5b2fa611e1d40', $single_rel->ID);
        //field_5b2fa64be1d41 -> position
        //$rel_position = get_field('field_5b2fa64be1d41', $single_rel->ID);

        if( intval($rel_supplier_id['ID']) == intval($supplier_id) && intval($rel_product_id->ID) == intval($product_id) ){
            $position = get_field('field_5b2fa64be1d41', $single_rel->ID);
        }
    }*/

    /*
    $order_new_status;
    // on bloque la commande sur " completed - place sur supplier "
	switch ( $position ) {
        case 1:
            if( $order_status == "waiting-first" ){
                $order_new_status = ['status' => 'accepted-first'];
                woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-first to accepted-first";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 2:
            if( $order_status == "waiting-second" ){
			    $order_new_status = ['status' => 'accepted-second'];
                woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-second to accepted-second";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 3:
            if( $order_status == "waiting-third" ){
			    $order_new_status = ['status' => 'accepted-third'];
                woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-third to accepted-third";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
		default:
		break;
    }
    */
    
    return $response;
    
    // Get product ID
	//$order = woocommerce_api_v2()->get('orders/'.$order_id);
	//$product_id = $order->line_items[0]->product_id;
    //$product = woocommerce_api_v2()->get('products/'.$product_id);
    
}
function reject_order_callback( $order_id,$supplier_id,$customer_id,$product_id,$mc_campaign_id,$mc_email_id ){

    $response = array();
    $response['status'] = "";
    $response['message'] = "";

    // Récupération data 

    // Order & Status
    $order = wc_get_order( $order_id );
    $order_status = $order->get_status();

    // Supplier Fournisseurs 

    $order_fournisseur_r1 = get_field('field_5b26fa0bd28f7', $order_id);
    $order_fournisseur_r2 = get_field('field_5b26fa45005e3', $order_id);
    $order_fournisseur_r3 = get_field('field_5b26fa56005e4', $order_id);

    // Supplier position 

    $position;
    if( $order_fournisseur_r1['ID'] == $supplier_id ){
        $position  = 1;
    }elseif( $order_fournisseur_r2['ID'] == $supplier_id ){
        $position  = 2;
    }elseif( $order_fournisseur_r3['ID'] == $supplier_id ){
        $position  = 3;
    }else{

    }

    $order_new_status;
	switch ( $position ) {
        case 1:
            if( $order_status == "waiting-first" ){
                $order_new_status = ['status' => 'waiting-second'];
                
                //woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $order->update_status( 'wc-waiting-second' );

                $response['status'] = "success";
                $response['message'] = "status changed form waiting-first to waiting-second";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 2:
            if( $order_status == "waiting-second" ){
			    $order_new_status = ['status' => 'waiting-third'];
                
                //woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $order->update_status( 'wc-waiting-third' );

                $response['status'] = "success";
                $response['message'] = "status changed form waiting-second to waiting-third";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 3:
            if( $order_status == "waiting-third" ){
			    $order_new_status = ['status' => 'nobody'];
                
                //woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $order->update_status( 'wc-nobody' );
                
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-third to nobody";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
		default:
		break;
    }


    
    // Product
    // $product = get_post($product_id);
    // Customer 
    // $customer = get_user_by('id',$customer_id);
    // Supplier 
    // $supplier = get_user_by('id',$supplier_id);    
    
    // Get position 


    /*$all_rel_suppliers_products = get_posts([
        'numberposts'=> -1, // all
        'post_type' => 'rel_supp_products'
    ]);
    $position = "";
    foreach( $all_rel_suppliers_products as $single_rel ){
        $single_rel_meta = get_post_meta( $single_rel->ID );
        //error_log(print_r($single_rel_meta,TRUE));

        //field_5b2fa5dbe1d3f -> supplier
        $rel_supplier_id= get_field('field_5b2fa5dbe1d3f', $single_rel->ID);
        //field_5b2fa611e1d40 -> product
        $rel_product_id = get_field('field_5b2fa611e1d40', $single_rel->ID);
        //field_5b2fa64be1d41 -> position
        //$rel_position = get_field('field_5b2fa64be1d41', $single_rel->ID);

        if( intval($rel_supplier_id['ID']) == intval($supplier_id) && intval($rel_product_id->ID) == intval($product_id) ){
            $position = get_field('field_5b2fa64be1d41', $single_rel->ID);
        }
    }*/

    /*$order_new_status;
    // on bloque la commande sur " completed - place sur supplier "
	switch ( $position ) {
        case 1:
            if( $order_status == "waiting-first" ){
                $order_new_status = ['status' => 'waiting-second'];
                woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-first to waiting-second";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 2:
            if( $order_status == "waiting-second" ){
			    $order_new_status = ['status' => 'waiting-third'];
                woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-second to waiting-third";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
        case 3:
            if( $order_status == "waiting-third" ){
			    $order_new_status = ['status' => 'nobody'];
                woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
                $response['status'] = "success";
                $response['message'] = "status changed form waiting-third to nobody";
            }else{
                $response['status'] = "error";
                $response['message'] = "Either already selected or rejected";
            }
		break;
		default:
		break;
    }*/
    
    return $response;

    /*
    $accept_order_callback_reponse = array();

    // Get all rel_suppliers_products
    $all_rel_suppliers_products = get_posts([
        'numberposts'=> -1, // all
        'post_type' => 'rel_supp_products'
    ]);
    $accept_order_callback_reponse['all_rel_suppliers_products'] = $all_rel_suppliers_products;
    
    // Get product ID
	$order = woocommerce_api_v2()->get('orders/'.$order_id);
	$product_id = $order->line_items[0]->product_id;
	$product = woocommerce_api_v2()->get('products/'.$product_id);
    
    // Get position 
    $position = "";
    foreach( $all_rel_suppliers_products as $single_rel ){
        $single_rel_meta = get_post_meta( $single_rel->ID );
        //error_log(print_r($single_rel_meta,TRUE));

        //field_5b2fa5dbe1d3f -> supplier
        $rel_supplier_id= get_field('field_5b2fa5dbe1d3f', $single_rel->ID);
        //field_5b2fa611e1d40 -> product
        $rel_product_id = get_field('field_5b2fa611e1d40', $single_rel->ID);
        //field_5b2fa64be1d41 -> position
        //$rel_position = get_field('field_5b2fa64be1d41', $single_rel->ID);

        if( intval($rel_supplier_id['ID']) == intval($supplier_id) && intval($rel_product_id->ID) == intval($product->id) ){
            $position = get_field('field_5b2fa64be1d41', $single_rel->ID);
        }
    }

    $order_new_status;
    // on bloque la commande sur " completed - place sur supplier "
	switch ( $position ) {
		case 1:
			$order_new_status = ['status' => 'waiting-second'];
			woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
		break;
		case 2:
            $order_new_status = ['status' => 'waiting-third'];
			woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
		break;
		case 3:
            $order_new_status = ['status' => 'nobody'];
			woocommerce_api_v2()->put('orders/'.$order_id, $order_new_status);
		break;
		default:
		break;
	}

    return ['new_status'=>$order_new_status];
    */

}

// Supplier and Product Relation
// * * * * * * * * * * * * * * * * * * * * * *

function generate_rel_suppliers_products_callback(){

    $response = array();
    error_log("generate_rel_suppliers_products_callback");

    // 1 Starting by DELETING all rel_suppliers_products
    // * * * * * * * * * * * * * * * * * * * * * *

    // Get all rel_suppliers_products
    $all_rel_suppliers_products = get_posts([
        'numberposts'=> -1, // all
        'post_type' => 'rel_supp_products',
    ]);
    // If not empty 
    if(!empty($all_rel_suppliers_products)){
        // delete all rel_suppliers_products
        foreach($all_rel_suppliers_products as $single_rel_suppliers_products){
            wp_delete_post( $single_rel_suppliers_products->ID );
        }
    }
    $response['message']['rel_suppliers_products'] = $all_rel_suppliers_products;

    // 2 Building all rel_suppliers_products
    // * * * * * * * * * * * * * * * * * * * * * *

    // Get all suppliers 
    $suppliers = get_users(['role' => 'supplier']);
    // Si il n'y a pas de suppliers => return 
    if( empty($suppliers) ){
        $response['status'] = "error";
        $response['message'] = "no suppliers";
        return $response;
    }
    $response['message']['supplier'] = $suppliers;
    // Get all suppliers meta
    $suppliers_metas = array();
    foreach( $suppliers as $supplier ){
        $supplier_meta = get_user_meta( $supplier->ID );
        array_push($suppliers_metas, $supplier_meta);
    }
    $response['message']['suppliers_metas'] = $suppliers_metas;

    // Get all products 
    $products = get_posts([
        'numberposts'=> -1, // all
        'post_type' => 'product'
    ]);
    // Si il n'y a pas de products => return 
    if( empty($products) ){
        $response['status'] = "error";
        $response['message'] = "no products";
        return $response;
    }
    $response['message']['products'] = $products;
    // Get all products meta
    $products_metas = array();
    foreach( $products as $product ){
        $product_meta = get_post_meta( $product->ID );
        array_push($products_metas, $product_meta);
    }
    $response['message']['products_metas'] = $products_metas;

    // Insert all rel_suppliers_products
    foreach( $suppliers as $supplier ){

        // Récupération des codes products / suppliers 
        $supplier_meta = get_user_meta( $supplier->ID );
        $supplier_products_codes_string = $supplier_meta['supplier_products_codes'][0];
        $supplier_products_codes_array = explode(";", $supplier_products_codes_string);

        // Boucle sur les codes
        foreach( $supplier_products_codes_array as $supplier_product_code_string ){
            $supplier_product_code_array = explode("_", $supplier_product_code_string);
            //error_log('$supplier_product_code_array');
            //error_log(print_r($supplier_product_code_array,TRUE));    

            // recherche du SKU du product
            foreach( $products as $product ){

                $product_meta = get_post_meta( $product->ID );
                $product_sku = $product_meta['_sku'][0];

                error_log( "product" );
                error_log( print_r($product, TRUE) );

                error_log( "product_meta" );
                error_log( print_r($product_meta, TRUE) );

                $product_variations = get_posts([
                    'post_type'     => 'product_variation',
                    'numberposts'   => -1,
                    'post_parent'   => $product->ID
                ]);

                error_log( "product_variations" );
                error_log( print_r($product_variations, TRUE) );

                //error_log('$product_sku');
                //error_log($product_sku);

                // On fait matcher le SKU avec le CODE PRODUCT et BIM on insert
                if( $product_sku == $supplier_product_code_array[0] ){

                    // Et les variations ? :'()
                    /*
                    foreach( $product_variations as $product_variation ){
                        // INSERTION 
                        $rel_supplier_product_name = $supplier->ID."_".$product_variation->ID."_".$supplier_product_code_array[1];
                        $rel_supplier_product_id = wp_insert_post([
                            'post_title'=>$rel_supplier_product_name,
                            'post_status'=>'publish',
                            'post_type'=>'rel_supp_products'
                        ]);
                        // INSERTION META
                        // supplier
                        update_field('field_5b2fa5dbe1d3f', $supplier->ID, $rel_supplier_product_id);
                        // product
                        update_field('field_5b2fa611e1d40', $product->ID, $rel_supplier_product_id);
                        // position 
                        update_field('field_5b2fa64be1d41', $supplier_product_code_array[1], $rel_supplier_product_id);
                    }
                    */

                    // Product

                    // INSERTION 
                    $rel_supplier_product_name = $supplier->ID."_".$product->ID."_".$supplier_product_code_array[1];
                    $rel_supplier_product_id = wp_insert_post([
                        'post_title'=>$rel_supplier_product_name,
                        'post_status'=>'publish',
                        'post_type'=>'rel_supp_products'
                    ]);

                    //error_log('$rel_supplier_product_id');
                    //error_log($rel_supplier_product_id);

                    // INSERTION META
                    // supplier
                    update_field('field_5b2fa5dbe1d3f', $supplier->ID, $rel_supplier_product_id);
                    // product
                    update_field('field_5b2fa611e1d40', $product->ID, $rel_supplier_product_id);
                    // position 
                    update_field('field_5b2fa64be1d41', $supplier_product_code_array[1], $rel_supplier_product_id);

                }
            }
        }
    }
    $response['status'] = "success";
    return $response;
}

// Mailing / MailChimp
// * * * * * * * * * * * * * * * * * * * * * *

// Customers
//https://stackoverflow.com/questions/44562589/mailchimp-automation-send-same-email-multiple-time

function add_customer_mailchimp( $customer, $password ){
    error_log("add_customer_mailchimp");
    //error_log(print_r($customer,TRUE));

    $mail_chimp_api_data = array(
        "email_address" => $customer->email,
        "status" => "subscribed",
        "merge_fields" => array(
            "UFOREIGNID" => strval($customer->id),
            //"UCODE" => $password,
            //"UNAME" => $customer->username
        )
    );
    $mail_chimp_api_data_string = json_encode($mail_chimp_api_data);

    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/07674e3e69/members",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
    CURLOPT_POSTFIELDS => $mail_chimp_api_data_string,
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
        "Cache-Control: no-cache",
        "Content-Type: application/json",
    ),
    ));
    $curl_response = curl_exec($curl);
    $curl_response_json_decode = json_decode($curl_response, true);
    $err = curl_error($curl);
    curl_close($curl);

    $reponse = ['curl_err'=>$err,'curl_data'=>$curl_response_json_decode];
    return $reponse;

}
function send_customer_code_mailchimp( $customer_id ){

    // Changement ici 
    error_log("send_customer_code_mailchimp");

    // Récupérer les membres de la liste TEMP et les DELETE 
    // * * * * * * * * * * * * * * * * * * * * * *
    $curlGetAllMembers = curl_init();
    curl_setopt_array($curlGetAllMembers, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/a053fbe6f8/members/",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        //CURLOPT_POSTFIELDS => $mailchimpsupplierdataJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curlGetAllMembersResponse = curl_exec($curlGetAllMembers);
    $curlGetAllMembersResponseDecode = json_decode($curlGetAllMembersResponse, true);
    $curlGetAllMembersErr = curl_error($curlGetAllMembers);
    curl_close($curlGetAllMembers);

    //error_log( print_r($curlGetAllMembersResponseDecode, TRUE) );

    if( !empty( $curlGetAllMembersResponseDecode['members'] ) ){
        foreach( $curlGetAllMembersResponseDecode['members'] as $member ){
            error_log($member['email_address']);

            $lowercase_email = strtolower($member['email_address']);
            $md5hash_email = md5($lowercase_email);
        
            $curl_remove_customer = curl_init();
            curl_setopt_array($curl_remove_customer, array(
                CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/a053fbe6f8/members/".$md5hash_email,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "DELETE",
                //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
                //CURLOPT_POSTFIELDS => $mailchimpsupplierdataJSON,
                CURLOPT_HTTPHEADER => array(
                    "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
                    "Cache-Control: no-cache",
                    "Content-Type: application/json",
                )
            ));
            $curl_remove_customer_response = curl_exec($curl_remove_customer);
            $curl_remove_customer_response_decode = json_decode($curl_remove_customer_response, true);
            $curl_remove_customer_err = curl_error($curl_remove_customer);
            curl_close($curl_remove_customer);

        }
    }

    // Ajouter customer en liste d’attente
    // * * * * * * * * * * * * * * * * * * * * * *

    // Gather informations
    $customer = get_user_by('id',$customer_id);
    $customer_email = $customer->data->user_email; 
    //$customer_pass = $customer->data->user_pass; 
    $customer_username = $customer->data->user_login;

    // New Password Every Time
    $customer_pass = globalRandomPassword();
    wp_set_password( $customer_pass, $customer_id );

    // MailChimp Array
    $mailchimpCustomerData = array(
        "email_address" => $customer_email,
        "status" => "subscribed",
        "merge_fields" => array(
            "UFOREIGNID" => strval($customer_id),
            "UCODE" => $customer_pass,
            "UNAME" => $customer_username
        )
    );
    $mailchimpCustomerDataJSON = json_encode($mailchimpCustomerData);

    // Ajout    
    $curl_add_customer = curl_init();
    curl_setopt_array($curl_add_customer, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/a053fbe6f8/members",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        CURLOPT_POSTFIELDS => $mailchimpCustomerDataJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curl_add_customer_response = curl_exec($curl_add_customer);
    $curl_add_customer_response_decode = json_decode($curl_add_customer_response, true);
    $err_add_customer = curl_error($curl_add_customer);
    curl_close($curl_add_customer);

    error_log("Ajout Customer");
    error_log(print_r($curl_add_customer_response_decode,TRUE));

    if( array_key_exists( "id", $curl_add_customer_response_decode ) ){

        // Create campaign
        // * * * * * * * * * * * * * * * * * * * * * *
        $mailchimpcreatecampaign = [
            "type"=>"regular",
            "recipients"=>[
                "list_id"=>"a053fbe6f8"
            ],
            "settings"=>[
                "subject_line" => "Vos identifiants CENTRALIS!",
                "preview_text" => "Ouvrez l'email pour obtenir vos identifiants.",
                //"title" => "send_order_".$order_id."_to_supplier_".$supplier_id."_".$random,
                "title" => "send_code_to_customer_".$customer_id,
                "from_name" => "CENTRALIS",
                "reply_to" => "lilian.tourillon@gmail.com",
                "inline_css"=>true,
                "template_id"=>111163
            ],
            "tracking"=>[
                "opens"=>true,
                "html_clicks"=>true,
                "text_clicks"=>true
            ]
        ];
        $mailchimpcreatecampaignJSON = json_encode($mailchimpcreatecampaign);

        $curl_create_campaign = curl_init();
        curl_setopt_array($curl_create_campaign, array(
            CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/campaigns",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
            CURLOPT_POSTFIELDS => $mailchimpcreatecampaignJSON,
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
                "Cache-Control: no-cache",
                "Content-Type: application/json",
            )
        ));
        $curl_create_campaign_response = curl_exec($curl_create_campaign);
        $curl_create_campaign_response_decode = json_decode($curl_create_campaign_response, true);
        $err_create_campaign = curl_error($curl_create_campaign);
        curl_close($curl_create_campaign);

        error_log("mailchimp create campaign response");
        error_log(print_r($curl_create_campaign_response_decode,TRUE));

        // Get the ID
        // * * * * * * * * * * * * * * * * * * * * * *
        $new_campaign_id = $curl_create_campaign_response_decode['id'];

        // Envoyer campaign
        // * * * * * * * * * * * * * * * * * * * * * *
        $curl_campaign_send = curl_init();
        curl_setopt_array($curl_campaign_send, array(
            CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/campaigns/".$new_campaign_id."/actions/send",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
            //CURLOPT_POSTFIELDS => $mailchimpcreatecampaignHTMLJSON,
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
                "Cache-Control: no-cache",
                "Content-Type: application/json",
            )
        ));
        $curl_campaign_send_response = curl_exec($curl_campaign_send);
        $curl_campaign_send_response_decode = json_decode($curl_campaign_send_response, true);
        $err_campaign_send = curl_error($curl_campaign_send);
        curl_close($curl_campaign_send);

        error_log("mailchimp send campaign response");
        error_log( print_r($curl_campaign_send_response_decode,TRUE) );
        error_log( print_r($err_campaign_send, TRUE) );        


    }

    // Envoi des identifiants API V3 ( Pas possible de faire comme ça )
    // * * * * * * * * * * * * * * * * * * * * * *

    /*$mailChimpPushCustomerEmailData = array(
        "email_address"=>$customer_email
    );
    $mailChimpPushCustomerEmailDataJSON = json_encode($mailChimpPushCustomerEmailData);

    $curlPushCustomerEmail = curl_init();
    curl_setopt_array($curlPushCustomerEmail, array(
      CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/automations/8d6112b94f/emails/91ca771862/queue",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+2@gmail.com\"\n}",
      CURLOPT_POSTFIELDS => $mailChimpPushCustomerEmailDataJSON,
      CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
        "Cache-Control: no-cache",
        "Content-Type: application/json",
      ),
    ));
    $curlPushCustomerEmailResponse = curl_exec($curlPushCustomerEmail);
    $curlPushCustomerEmailResponseDecode = json_decode($curlPushCustomerEmailResponse, true);
    $curlPushCustomerEmailErrors = curl_error($curlPushCustomerEmail);
    curl_close($curlPushCustomerEmail);

    error_log(print_r("Envoi Mail",TRUE));
    error_log(print_r($curlPushCustomerEmailResponseDecode,TRUE));*/

    

    // After -> Retirer Customer de la liste d'attente
    // * * * * * * * * * * * * * * * * * * * * * *

    //error_log("mailchimp remove supplier response");
    //error_log(print_r($curl_remove_customer_response_decode,TRUE));    

    $arrayresponse['status'] = "success";
    $arrayresponse['data'] = "Identifiants envoyés";
    return $arrayresponse;
    
}
function send_customer_validation_mailchimp(){
}
function send_customer_rejection_mailchimp(){
}

// Suppliers
function add_supplier_mailchimp( $supplier, $password ){

    $mail_chimp_api_data = array(
        "email_address" => $supplier->user_email,
        "status" => "subscribed",
        "merge_fields" => array(
            "UFOREIGNID" => strval($supplier->ID),
            "UCODE" => $password,
        )
    );
    $mail_chimp_api_data_string = json_encode($mail_chimp_api_data);

    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/5f637de0cf/members",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
    CURLOPT_POSTFIELDS => $mail_chimp_api_data_string,
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
        "Cache-Control: no-cache",
        "Content-Type: application/json",
    ),
    ));
    $curl_response = curl_exec($curl);
    $curl_response_json_decode = json_decode($curl_response, true);
    $err = curl_error($curl);
    curl_close($curl);

    $reponse = ['curl_err'=>$err,'curl_data'=>$curl_response_json_decode];
    return $reponse;
}

//https://mandrill.zendesk.com/hc/en-us/articles/205582927-Can-I-disable-click-tracking-on-selected-links-in-my-email-
//https://stackoverflow.com/questions/40004145/disable-tracking-for-specific-link-in-mailchimp
//https://stackoverflow.com/questions/28608826/mailchimp-use-merge-tags-in-link-url
function send_supplier_order( $supplier_id, $order_id, $product_qty_ids, $customer_id  ){

    //$customer = get_user_by('id', $customer_id);
    //error_log(print_r($customer,TRUE));
    //die();

    // ( lol wtf )

    // Generate random 
    
    /*function random() {
		$alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}
    $random = random();*/
    
    $response = array();

    // Récupérer les membres de la liste TEMP et les DELETE 
    // * * * * * * * * * * * * * * * * * * * * * *
    $curlGetAllMembers = curl_init();
    curl_setopt_array($curlGetAllMembers, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/9bf663e6a1/members/",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        //CURLOPT_POSTFIELDS => $mailchimpsupplierdataJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curlGetAllMembersResponse = curl_exec($curlGetAllMembers);
    $curlGetAllMembersResponseDecode = json_decode($curlGetAllMembersResponse, true);
    $curlGetAllMembersErr = curl_error($curlGetAllMembers);
    curl_close($curlGetAllMembers);

    error_log(print_r($curlGetAllMembersResponseDecode, TRUE));
    
    if( !empty( $curlGetAllMembersResponseDecode['members'] ) ){
        foreach( $curlGetAllMembersResponseDecode['members'] as $member ){

            error_log("member['email_address']");
            error_log($member['email_address']);

            $lowercase_email = strtolower($member['email_address']);
            $md5hash_email = md5($lowercase_email);
        
            $curl_remove_customer = curl_init();
            curl_setopt_array($curl_remove_customer, array(
                CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/9bf663e6a1/members/".$md5hash_email,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "DELETE",
                //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
                //CURLOPT_POSTFIELDS => $mailchimpsupplierdataJSON,
                CURLOPT_HTTPHEADER => array(
                    "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
                    "Cache-Control: no-cache",
                    "Content-Type: application/json",
                )
            ));
            $curl_remove_customer_response = curl_exec($curl_remove_customer);
            $curl_remove_customer_response_decode = json_decode($curl_remove_customer_response, true);
            $curl_remove_customer_err = curl_error($curl_remove_customer);
            curl_close($curl_remove_customer);

            //error_log('curl_remove_customer_response_decode');
            //error_log(print_r($curl_remove_customer_response_decode,TRUE));

        }
    }

    // Ajouter supplier en liste d’attente
    // * * * * * * * * * * * * * * * * * * * * * *
    $supplier = get_user_by('id',$supplier_id);
    $supplier_email = $supplier->data->user_email; 
    $supplier_pass = $supplier->data->user_pass; 
    
    $mailchimpsupplierdata = array(
        "email_address" => $supplier_email,
        "status" => "subscribed"
        //"merge_fields" => array(
            //"UFOREIGNID" => strval($supplier_id),
            //"UCODE" => $supplier_pass,
        //)
    );
    $mailchimpsupplierdataJSON = json_encode($mailchimpsupplierdata);
    $curl_add_supplier = curl_init();
    curl_setopt_array($curl_add_supplier, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/9bf663e6a1/members",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        CURLOPT_POSTFIELDS => $mailchimpsupplierdataJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curl_add_supplier_response = curl_exec($curl_add_supplier);
    $curl_add_supplier_response_decode = json_decode($curl_add_supplier_response, true);
    $err_add_supplier = curl_error($curl_add_supplier);
    curl_close($curl_add_supplier);
    
    error_log("mailchimp add supplier response");
    error_log(print_r($curl_add_supplier_response_decode,TRUE));


    // Create campaign
    // * * * * * * * * * * * * * * * * * * * * * *

    $customer = get_user_by('id', $customer_id);

    $order_total = 0;
    $email_products = array();

    foreach( $product_qty_ids as $product_qty_id_key => $product_qty_id_value ){

        //error_log($product_qty_id_key);
        //error_log($product_qty_id_value);

        $wc_product = wc_get_product($product_qty_id_key );
        
        //error_log(print_r( $wc_product,TRUE ));

        $email_product = [

            //"order_item_code" => " ",
            "order_item_name" => $wc_product->get_name(),
            "order_item_quantity" => $product_qty_id_value,
            "order_item_value" => $wc_product->get_price(),

        ];

        array_push( $email_products,  $email_product );

        $product_price = $wc_product->get_price() * $product_qty_id_value;
        $order_total = $order_total + $product_price;

    };

    // prod
    $order_accept_link = "<a style='color:#ffffff;text-align:center;text-decoration:none;' class='fullBtn' target='_blank' href='http://senovea-prod.surge.sh/supplier/accept?o=".$order_id."&c=".$customer_id."&p=&s=".$supplier_id."'>Accepter la commande</a>";
    $order_refuse_link = "<a style='color:#000000;text-align:center;text-decoration:none;' class='fullBtn' target='_blank' href='http://senovea-prod.surge.sh/supplier/reject?o=".$order_id."&c=".$customer_id."&p=&s=".$supplier_id."'>Refuser la commande</a>";

    // dev
    //$order_accept_link = "<a style='color:#ffffff;text-align:center;text-decoration:none;' class='fullBtn' target='_blank' href='http://localhost:8080/supplier/accept?o=".$order_id."&c=".$customer_id."&p=&s=".$supplier_id."'>Accepter la commande</a>";
    //$order_refuse_link = "<a style='color:#000000;text-align:center;text-decoration:none;' class='fullBtn' target='_blank' href='http://localhost:8080/supplier/reject?o=".$order_id."&c=".$customer_id."&p=&s=".$supplier_id."'>Refuser la commande</a>";


    //error_log(print_r( $email_products, TRUE ));

    $mailchimpcreatecampaign = [
        "recipients"=>[
            "list_id"=>"9bf663e6a1"
        ],
        "type"=>"regular",
        "settings"=>[
            "subject_line" => "Nouvelle commande CENTRALIS",
            "preview_text" => "Ouvre l'email pour voir la commande.",
            //"title" => "send_order_".$order_id."_to_supplier_".$supplier_id."_".$random,
            "title" => "send_order_".$order_id."_to_supplier_".$supplier_id,
            "from_name" => "CENTRALIS",
            "reply_to" => "lilian.tourillon@gmail.com",
            "inline_css"=>true,
            "template_id"=>111535
        ],
        "tracking"=>[
            "opens"=>true,
            "html_clicks"=>true,
            "text_clicks"=>true
        ]
    ];
    $mailchimpcreatecampaignJSON = json_encode($mailchimpcreatecampaign);

    $curl_create_campaign = curl_init();
    curl_setopt_array($curl_create_campaign, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/campaigns",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        CURLOPT_POSTFIELDS => $mailchimpcreatecampaignJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curl_create_campaign_response = curl_exec($curl_create_campaign);
    $curl_create_campaign_response_decode = json_decode($curl_create_campaign_response, true);
    $err_create_campaign = curl_error($curl_create_campaign);
    curl_close($curl_create_campaign);

    //error_log("mailchimp create campaign response");
    //error_log(print_r($curl_create_campaign_response_decode,TRUE));

    // En attente //

    // Get the ID
    // * * * * * * * * * * * * * * * * * * * * * *
    $new_campaign_id = $curl_create_campaign_response_decode['id'];

    // Edit campaign template 
    // * * * * * * * * * * * * * * * * * * * * * *
    // dev 
    /*$mailchimpcreatecampaignHTML = [
        "html"=>"
        <div>
            <h1>Hello dear Supplier</h1>
        </div>
        <div>
            <ul>
                <li>Order ID ".$order_id.": </li>
                <li>Customer ID ".$customer_id.": </li>
                <li> Products : </li>
                <li>Supplier ID ".$supplier_id.": </li>
            </ul>
        </div>
        <div>
            <button><a target='_blank' href='http://localhost:8080/supplier/reject?o=".$order_id."&c=".$customer_id."&p=&s=".$supplier_id."'>REJECT THIS ORDER</a></button>
        </div>
        <div>
            <button><a target='_blank' href='http://localhost:8080/supplier/accept?o=".$order_id."&c=".$customer_id."&p=&s=".$supplier_id."'>ACCEPT THIS ORDER</a></button>
        </div>"
    ];*/
    // prod
    /*$mailchimpcreatecampaignHTML = [
        "html"=>"
        <div>
            <h1>Hello dear Supplier</h1>
        </div>
        <div>
            <ul>
                <li>Order ID ".$order_id.": </li>
                <li>Customer ID ".$customer_id.": </li>
                <li>Product ID ".$product_id.": </li>
                <li>Supplier ID ".$supplier_id.": </li>
            </ul>
        </div>
        <div>
            <button><a target='_blank' href='https://senovea-prod.surge.sh/supplier/reject?o=".$order_id."&c=".$customer_id."&p=".$product_id."&s=".$supplier_id."'>REJECT THIS ORDER</a></button>
        </div>
        <div>
            <button><a target='_blank' href='http://senovea-prod.surge.sh/supplier/accept?o=".$order_id."&c=".$customer_id."&p=".$product_id."&s=".$supplier_id."'>ACCEPT THIS ORDER</a></button>
        </div>"
    ];*/

    $mailchimpcreatecampaignHTML = [
        "template" => [
            "id" => 111535,
            "sections" => [

                "order_id" => "#".$order_id,

                "order_paragraph" => "",

                // Les prestations
                "repeat_1" => $email_products,
                "order_total" => $order_total,

                // lieu d'intervention
                "order_arrondissement" => "",
                "order_adresse" => "",
                "order_code_postal" => "",

                // customer informations
                "order_customer_name"=> $customer->data->user_login,
                "order_customer_email"=> $customer->data->user_email,
                "order_customer_organisme"=> get_field('field_5b34e99e79a21', "user_".$customer_id),
                "order_customer_service"=> get_field('field_5b34e9b079a22', "user_".$customer_id),
                "order_customer_phone"=> get_field('field_5b34e9566fc98', "user_".$customer_id),

                // Button accept / refuse
                "order_refuse_link" => $order_refuse_link,
                "order_accept_link" => $order_accept_link

            ]
        ]

    ];
    $mailchimpcreatecampaignHTMLJSON = json_encode($mailchimpcreatecampaignHTML);

    $curl_campaign_edit = curl_init();
    curl_setopt_array($curl_campaign_edit, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/campaigns/".$new_campaign_id."/content",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "PUT",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        CURLOPT_POSTFIELDS => $mailchimpcreatecampaignHTMLJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curl_campaign_edit_response = curl_exec($curl_campaign_edit);
    $curl_campaign_edit_response_decode = json_decode($curl_campaign_edit_response, true);
    $err_campaign_edit = curl_error($curl_campaign_edit);
    curl_close($curl_campaign_edit);

    //error_log("mailchimp edit campaign response");
    //error_log(print_r($curl_campaign_edit_response_decode,TRUE));


    // Envoyer campaign
    // * * * * * * * * * * * * * * * * * * * * * *

    $curl_campaign_send = curl_init();
    curl_setopt_array($curl_campaign_send, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/campaigns/".$new_campaign_id."/actions/send",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        //CURLOPT_POSTFIELDS => $mailchimpcreatecampaignHTMLJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curl_campaign_send_response = curl_exec($curl_campaign_send);
    $curl_campaign_send_response_decode = json_decode($curl_campaign_send_response, true);
    $err_campaign_send = curl_error($curl_campaign_send);
    curl_close($curl_campaign_send);

    error_log("mailchimp send campaign response");
    error_log(print_r($curl_campaign_send_response,TRUE));

    // Supprimer supplier de la liste d’attente
    // * * * * * * * * * * * * * * * * * * * * * *

    /*$lowercase_email = strtolower($supplier_email);
    $md5hash_email = md5($lowercase_email);

    $curl_remove_supplier = curl_init();
    curl_setopt_array($curl_remove_supplier, array(
        CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/lists/9bf663e6a1/members/".$md5hash_email,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        //CURLOPT_POSTFIELDS => "{\n\t\"email_address\":\"senoveamailtest+1000@gmail.com\", \n\t\"status\":\"subscribed\",\n\t\"merge_fields\":{\n\t\t\"UCODE\":\"HHHBBBVVVXXX\"\n\t}\n}",
        CURLOPT_POSTFIELDS => $mailchimpsupplierdataJSON,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer 58129082f49cc32ef8e68c3e81bb1490-us16",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
        )
    ));
    $curl_remove_supplier_response = curl_exec($curl_remove_supplier);
    $curl_remove_supplier_response_decode = json_decode($curl_remove_supplier_response, true);
    $err_remove_supplier = curl_error($curl_remove_supplier);
    curl_close($curl_remove_supplier);

    error_log("mailchimp remove supplier response");*/
    //error_log(print_r($curl_remove_supplier_response_decode,TRUE));
  
    // * * * * * * * * * * * * * * * * * * * * * *

    $response['status'] = 200;
    $response['message'] = "send_supplier_order";
    return $response ;

}

/* *
 * 3. SENOVEA API
 * All the function associated with the senovea custom API
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Paniers
// * * * * * * * * * * * * * * * * * * * * * *
add_action( 'rest_api_init', 'register_rest_senovea_paniers_routes');
function register_rest_senovea_paniers_routes(){
    // POST panier
    register_rest_route('senovea/v2', 'panier', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_post_panier'
    ));
    // GET PANIER
    register_rest_route('senovea/v2', 'panier/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_v2_get_panier'
    ));
    // POST product to panier
    register_rest_route('senovea/v2', 'panier/addproduct', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_post_product_to_panier'
    ));
    // POST product to panier
    register_rest_route('senovea/v2', 'panier/order', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_order_panier'
    ));
}
function senovea_woocommerce_proxy_v2_post_panier( WP_REST_Request $request ){
    $response = array();
    $params = $request->get_params();

    $add_panier_response = add_panier($params);
    return new WP_REST_Response($add_panier_response, 200);
}
function senovea_woocommerce_proxy_v2_get_panier( WP_REST_Request $request ){
    $response = array();
    $params = $request->get_params();

    $get_panier_response = get_panier($params);
    return new WP_REST_Response($get_panier_response, 200);
}
function senovea_woocommerce_proxy_v2_post_product_to_panier( WP_REST_Request $request ){
    $response = array();
    $params = $request->get_params();
    $response['params'] = $params;

    $add_product_to_panier_response = add_product_to_panier($params);
    return new WP_REST_Response($add_product_to_panier_response, 200);
}
function senovea_woocommerce_proxy_v2_order_panier(  WP_REST_Request $request  ){
    $params = $request->get_params();
    $order_panier_response = order_panier_response($params);
    return new WP_REST_Response($order_panier_response, 200);
}

// Product
// * * * * * * * * * * * * * * * * * * * * * *
add_action( 'rest_api_init', 'register_rest_senovea_product_routes');
function register_rest_senovea_product_routes(){
    // GET all products
    register_rest_route('senovea/v2', 'products/(?P<user_arrondissement>\d+)', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_v2_get_products'
	));
}
function senovea_woocommerce_proxy_v2_get_products( WP_REST_Request $request ){
    //$products = woocommerce_api()->get('products');
    $user_arrondissement = $request->get_param( 'user_arrondissement' );
    error_log('user_arrondissement');
    error_log($user_arrondissement);
    $get_all_products_response = get_all_products( $user_arrondissement );
    return new WP_REST_Response($get_all_products_response, 200);
}

// Suppliers
add_action( 'rest_api_init', 'register_rest_senovea_supplier_routes');
function register_rest_senovea_supplier_routes(){
    // GET all customer
    register_rest_route('senovea/v2', 'supplier', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_v2_get_all_supplier',
    ));
}
function senovea_woocommerce_proxy_v2_get_all_supplier(  WP_REST_Request $request ){   
    $response = array();

    $suppliers = get_users([
        'role' => 'supplier',
    ]);

    $formatted_suppliers = array();
    if( !empty( $suppliers ) ){
        foreach( $suppliers as $supplier ){
            
            $newsupplier = array();
            
            // Classic field
            $newsupplier['id'] = $supplier->data->ID;
            $newsupplier['username'] = $supplier->data->user_login;
            $newsupplier['user_email'] = $supplier->data->user_email;
            $newsupplier['user_registered'] = $supplier->data->user_registered;

            // ACF 
            $newsupplier['arrondissement'] = get_field('field_5b34f70d8d326', "user_".$supplier->data->ID);
            $newsupplier['organisme'] = get_field('field_5b34fb74c676f', "user_".$supplier->data->ID);
            $newsupplier['contact'] = get_field('field_5b35701456e2d', "user_".$supplier->data->ID);
            $newsupplier['adresse'] = get_field('field_5b353d8c0e99e', "user_".$supplier->data->ID);
            $newsupplier['phone'] = get_field('field_5b34f7ed549e8', "user_".$supplier->data->ID);

            array_push($formatted_suppliers,  $newsupplier);
        }
    }

    $response['status'] = "success";
    $response['data'] = $formatted_suppliers;

    return new WP_REST_Response( $response , 200);
}

// Customers
// * * * * * * * * * * * * * * * * * * * * * *
add_action( 'rest_api_init', 'register_rest_senovea_customer_routes');
function register_rest_senovea_customer_routes(){
    // GET all customer
    register_rest_route('senovea/v2', 'customer', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_v2_get_all_customer',
    ));
    // GET customer
    register_rest_route('senovea/v2', 'customer/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_v2_get_customer',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
    ));
    // POST customer
    register_rest_route('senovea/v2', 'customer', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_post_customer'
    ));
    // UPDATE customer
    register_rest_route('senovea/v2', 'customer/update/(?P<id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_update_customer',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
    ));
    // DELETE customer
    register_rest_route('senovea/v2', 'customer/delete/(?P<id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_delete_customer',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
    )); 
    // SEND IDENTIFIANT CUSTOMER
    // ici
    register_rest_route('senovea/v2', 'customer/reset', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_reset_customer'
    ));
}
function senovea_woocommerce_proxy_v2_get_all_customer( WP_REST_Request $request ){
    //$customers = woocommerce_api()->get( 'customers' );
    $response = array();

    $customers = get_users([
        'role' => 'customer',
    ]);

    $response['status'] = "success";
    $response['data'] = $customers;

    return new WP_REST_Response( $customers , 200);
}
function senovea_woocommerce_proxy_v2_get_customer( WP_REST_Request $request ){
	$uid = $request->get_param( 'id' );
    //$customer = woocommerce_api()->get( 'customers/'.$uid );
    $customer = get_user_by( 'id', $uid );
    error_log(print_r($customer,TRUE));
    
    
    $customer_array = array(
        'user_id'=>$customer->data->ID,
        'user_arrondissement'=> get_field('field_5b34e8b26e052',"user_".$customer->data->ID),
        'user_email'=>$customer->data->user_email,
        'user_name'=>$customer->data->user_nicename,
        'user_first_name'=>"",
        'user_last_name'=>""
    );

    // Ajouter Arrondissement 
    return new WP_REST_Response( $customer_array , 200);
    
}
function senovea_woocommerce_proxy_v2_post_customer( WP_REST_Request $request ){
    // create the customer 
    $add_customer_reponse = add_customer_callback( $request );
    // return response
    return new WP_REST_Response($add_customer_reponse, 200);
}
function senovea_woocommerce_proxy_v2_update_customer( WP_REST_Request $request ){
    // TODO :: update customer 

	/*$uid = $request->get_param( 'id' );
	$email = $request->get_param( 'email' );
	$data = ["email" => $email];
	$customer = woocommerce_api()->put( 'customers/'.$uid, $data );*/
	return new WP_REST_Response('senovea_woocommerce_proxy_v2_update_customer', 200); 
}
function senovea_woocommerce_proxy_v2_delete_customer( WP_REST_Request $request ){
    // TODO :: delete customer 
    return new WP_REST_Response('senovea_woocommerce_proxy_v2_delete_customer', 200);
}
function senovea_woocommerce_proxy_v2_reset_customer( WP_REST_Request $request ){

    $params = $request->get_params();
    $customer_email = $params['customer_email'];
    $customer = get_user_by('email', $customer_email);
    $customer_id = $customer->ID;

    $send_customer_code_mailchimp_response = send_customer_code_mailchimp( $customer_id );
    return new WP_REST_Response($send_customer_code_mailchimp_response, 200);

}

// Order
// * * * * * * * * * * * * * * * * * * * * * *
add_action( 'rest_api_init', 'register_rest_senovea_order_routes');
function register_rest_senovea_order_routes(){
    // POST order
    register_rest_route('senovea/v2', 'order', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_post_order'
    ));
    // DELETE order
    register_rest_route('senovea/v2', 'order/delete/(?P<id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_delete_order',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
    )); 
    // ACCEPT order
    register_rest_route('senovea/v2', 'order/accept', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_accept_order'
	));
    // REJECT order
    register_rest_route('senovea/v2', 'order/reject', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_v2_reject_order'
	));
}
function senovea_woocommerce_proxy_v2_post_order( WP_REST_Request $request ){
    $parameters = $request->get_params();
	$customer_id = $parameters['customer_id'];
    $product_id = $parameters['product_id'];
    $add_order_callback = add_order_callback($customer_id,$product_id);
    return new WP_REST_Response($add_order_callback, 200);
}
function senovea_woocommerce_proxy_v2_delete_order( WP_REST_Request $request ){
    return new WP_REST_Response('senovea_woocommerce_proxy_v2_delete_order', 200);
}
function senovea_woocommerce_proxy_v2_accept_order( WP_REST_Request $request ){
    $parameters = $request->get_params();
    $reponse = array();
	$reponse['parameters'] = $parameters;
    
	$supplier_id = intval($parameters['supplier_id']);
    $order_id = intval($parameters['order_id']);
    $customer_id = intval($parameters['customer_id']);
    $product_id = intval($parameters['product_id']);

    $mc_campaign_id = $parameters['mc_campaign_id'];
    $mc_email_id = $parameters['mc_email_id'];

    $accept_order_callback_response = accept_order_callback($order_id,$supplier_id,$customer_id,$product_id,$mc_campaign_id,$mc_email_id);
    //return new WP_REST_Response($accept_order_callback_response, 200);

    return new WP_REST_Response($accept_order_callback_response, 200);
}
function senovea_woocommerce_proxy_v2_reject_order( WP_REST_Request $request ){
    
    //return new WP_REST_Response("senovea_woocommerce_proxy_v2_reject_order", 200);

    $parameters = $request->get_params();
    $reponse = array();
	$reponse['parameters'] = $parameters;
    
	$supplier_id = intval($parameters['supplier_id']);
    $order_id = intval($parameters['order_id']);
    $customer_id = intval($parameters['customer_id']);
    $product_id = intval($parameters['product_id']);

    $mc_campaign_id = $parameters['mc_campaign_id'];
    $mc_email_id = $parameters['mc_email_id'];

    $reject_order_callback_response = reject_order_callback($order_id,$supplier_id,$customer_id,$product_id,$mc_campaign_id,$mc_email_id);
    //return new WP_REST_Response($reject_order_callback_response, 200);

    return new WP_REST_Response($reject_order_callback_response, 200);

}

/* *
 * 4. SENOVEA CUSTOM UI
 * All function to build the custom senovea admin UI
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Senovea Custom UI
// * * * * * * * * * * * * * * * * * * * * * *

// Senovea UI : Page Construction
// https://gist.github.com/taterbase/2688850
function senovea_ui_callback(){
    if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
    }
    echo '<div class="wrap">';
    echo '<h1>Senovea UI</h1>';
    echo '<hr/>';
    echo '<div class="nav-tab-wrapper">';
    echo '<a href="javascript:void(0)" class="nav-tab nav-tab-active"> Importer Table Arrondissement </a>';
    echo '</div>';
    echo '<div class="postbox" style="margin-top:15px">';
    echo '<div class="inside">';
    echo '<p> Vous pouvez importer vos arrondissement ici. </p>';
    echo '<form enctype="multipart/form-data" id="senovea_ui_import_arrondissement_form">';
        echo '<div>';
        echo '<input type="file" accept=".csv" name="senovea_ui_import_arrondissement_input" id="senovea_ui_import_arrondissement_input" />';
        echo '</div>';
        echo '<div>';
        echo '<button type="submit" class="button-primary" title="senovea_ui_import_arrondissement_trigger" id="senovea_ui_import_arrondissement_trigger"> Importer Table Arrondissement </button>';
        echo '</div>';
    echo '</form>';
    echo '<p> Status : <span id="senovea_ui_import_arrondissement_status"> waiting action </span> </p>';
    echo '</div>';
    echo '</div>';
    echo '<div class="nav-tab-wrapper">';
    echo '<a href="javascript:void(0)" class="nav-tab nav-tab-active"> Importer Table Fournisseurs </a>';
    echo '</div>';
    echo '<div class="postbox" style="margin-top:15px">';
    echo '<div class="inside">';
    echo '<p> Vous pouvez importer vos fournisseurs ici. </p>';
    echo '<form enctype="multipart/form-data" id="senovea_ui_import_supplier_form">';
        echo '<div>';
        echo '<input type="file" accept=".csv" name="senovea_ui_import_supplier_file_input" id="senovea_ui_import_supplier_file_input" />';
        echo '</div>';
        echo '<div>';
        echo '<button type="submit" class="button-primary" title="" id="senovea_ui_import_supplier_trigger"> Importer Table Fournisseurs </button>';
        echo '</div>';
    echo '</form>';
    echo '<p> Status : <span id="senovea_ui_import_supplier_status"> waiting action </span> </p>';
    echo '</div>';
    echo '</div>';
    //echo '<div class="nav-tab-wrapper">';
    //echo '<a href="javascript:void(0)" class="nav-tab nav-tab-active"> Synchronize Suppliers and Products </a>';
    //echo '</div>';
    //echo '<div class="postbox" style="margin-top:15px">';
    //echo '<div class="inside">';
    //echo '<p>Vous devez synchroniser vos produits et vos suppliers après chaque imports ou modifications. </p>';
    //echo '<button type="button" class="button-primary" title="" id="senovea_ui_synchronize_suppliers_and_products_trigger"> Synchronize Suppliers and Products </button>';
    //echo '<p> Status : <span id="senovea_ui_synchronize_suppliers_and_products_status"> waiting action </span> </p>';
    //echo '</div>';
    //echo '</div>';
    echo '<div class="nav-tab-wrapper">';
    echo '<a href="javascript:void(0)" class="nav-tab nav-tab-active"> Import Products </a>';
    echo '</div>';   
    echo '<div class="postbox" style="margin-top:15px">';
    echo '<div class="inside">';
    echo '<p> Vous pouvez utiliser l\'outil d\'importation de WooCommerce pour vos produits ( Rubrique Products -> All Products ) </p>';
    echo '</div>';
    echo '</div>'; 
    echo '</div>';
}
// Senovea UI : Admin Menu Construction
function register_senovea_menu_page(){
    add_menu_page( 'Senovea UI', 'Senovea UI', 'manage_options', 'senovea_ui', 'senovea_ui_callback' );
}
add_action( 'admin_menu', 'register_senovea_menu_page' );
// Senovea UI : Scripts Load
function senovea_ui_scripts( $hook ) { 
    // error_log($hook);
    if ( $hook != 'toplevel_page_senovea_ui' ) {
        return;
    }

    // Set up the thickbox.
    wp_enqueue_style('thickbox');
    wp_enqueue_script('thickbox');

    /*wp_enqueue_style(
        'senovea-functions-css',
        plugin_dir_url(__FILE__) . 'css/senovea-functions.css'
    );*/
    wp_enqueue_script(
        'senovea-ui-functions.js',
        plugin_dir_url(__FILE__) . 'js/senovea-ui-functions.js',
        array('jquery')
    );
}
add_action( 'admin_enqueue_scripts', 'senovea_ui_scripts', 10, 1 );
// Senovea UI : AJAX Callback

function senovea_ui_synchronize_suppliers_and_products_callback(){
    $generate_rel_suppliers_products_callback = generate_rel_suppliers_products_callback();
    wp_send_json( $generate_rel_suppliers_products_callback );
};
add_action( 'wp_ajax_senovea_ui_synchronize_suppliers_and_products_action', 'senovea_ui_synchronize_suppliers_and_products_callback', 10, 1);

// https://wordpress.stackexchange.com/questions/198781/wordpress-ajax-file-upload-frontend
// https://stackoverflow.com/questions/9139202/how-to-parse-a-csv-file-using-php
// https://developer.wordpress.org/reference/functions/post_exists/
function senovea_ui_import_supplier_callback(){

    /*function randomPasswordSupplier() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }*/

    //error_log( print_r($_POST,TRUE) );
    //error_log( print_r($_FILES,TRUE) );

    if (!function_exists('wp_handle_upload')) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }
    $uploadedfile = $_FILES['senovea_ui_import_supplier_file'];
    $upload_overrides = array('test_form' => false);
    $movefile = wp_handle_upload($uploadedfile, $upload_overrides);

    $new_suppliers_array = array();

    error_log($movefile['url']);
    if ($movefile && !isset($movefile['error'])) {
        $row = 0;
        if (($handle = fopen($movefile['url'], "r")) !== FALSE) { 
            // Open file
            //error_log('fopen');
            // On boucle tant qu'il y a des row
            while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
                // on skip le header
                if( $row !== 0 ){

                    //error_log("DATA");
                    //error_log(print_r($data,TRUE));

                    // Ajout des fournisseurs parmis les utilisateurs wordpress 

                    error_log("row:");
                    //error_log($row);
                    //error_log($data[5]);
                    //$existing_user_un_by_mail = get_user_by( 'user_email', $data[5] );
                    //error_log(print_r($existing_user_un_by_mail,TRUE));
                    //error_log(wp_slash(explode("@", $data[5])[0]));
                    //$existing_user_un_by_username = get_user_by( 'user_login', explode("@", $data[5])[0] );
                    //error_log(print_r($existing_user_un_by_username,TRUE));

                    //$uname_exist = username_exists( explode("@", $data[5])[0] );
                    //$uemail_exist = email_exists( $data[5] );

                    //error_log($uname_exist);
                    //error_log($uemail_exist);

                    //error_log($data[10]);
                    //$existing_user_deux = get_user_by( 'email', $data[10] );
                    //error_log(print_r($existing_user_deux,TRUE));
                    //error_log($data[15]);
                    //$existing_user_trois = get_user_by( 'email', $data[15] );
                    //error_log(print_r($existing_user_trois,TRUE));


                    // Vérifier avec le username & l'email

                    // ========================================================================================
                    
                    // Le Fournisseur 1
                    $existing_user_un = get_user_by( 'email', $data[5] );
                    error_log("existing_user_un");
                    error_log(print_r($existing_user_un,TRUE));

                    $fournisseur_un_id;
                    // Si le fournisseur existe 
                    if( !empty( $existing_user_un ) ){

                        

                        // Mise à jour du fournisseur
                        $fournisseur_un_id = $existing_user_un->ID;

                        update_field('field_5b34f70d8d326',$data[0],"user_".$fournisseur_un_id);

                        // The repeater ( lot number et lot name )
                        // Vérifier si le lot existe déjà 
                        $lorrows = get_field('field_5b35389e0257b',"user_".$fournisseur_un_id );
                        if($lorrows){

                            $supplier_lot_number_all = array_column($lorrows, 'supplier_lot_number');
                            //error_log(print_r($supplier_lot_number_all,TRUE));

                            if( in_array( intval($data[1]) , $supplier_lot_number_all ) ){
                                // nothing
                            }else{
                                $fournisseur_lot_row = [
                                    'field_5b355be54fdb0'=>$data[1],
                                    'field_5b35669a62aa6'=>$data[2]
                                ];
                                add_row( "field_5b35389e0257b", $fournisseur_lot_row, "user_".$fournisseur_un_id );
                            }

                        }

                        //update_field('field_5b352f739d167',$data[2],"user_".$fournisseur_un_id);
                        update_field('field_5b34fb74c676f',$data[3],"user_".$fournisseur_un_id);
                        update_field('field_5b35701456e2d',$data[4],"user_".$fournisseur_un_id);
                        update_field('field_5b34f7ed549e8',$data[6],"user_".$fournisseur_un_id);
                        update_field('field_5b353d8c0e99e',$data[7],"user_".$fournisseur_un_id);

                    }else{

                        // Création du fournisseur
                        $fournisseur_un = array(
                            "user_login"=>explode("@", $data[5])[0],
                            "user_email"=>$data[5],
                            "user_pass"=>globalRandomPassword(),
                        );
                        $fournisseur_un_id = wp_create_user($fournisseur_un["user_login"], $fournisseur_un["user_pass"], $fournisseur_un["user_email"]);
                        
                        //error_log(print_r($fournisseur_un,TRUE));
                        if( gettype($fournisseur_un_id) == "integer" ){
     
                            // Update champs classiques du fournisseur
                            $fournisseur_un_update = array(
                                "ID"=>$fournisseur_un_id,
                                "role"=>"supplier"
                            );
                            wp_update_user($fournisseur_un_update);

                            // Update ACF du fournisseur
                            update_field('field_5b34f70d8d326',$data[0],"user_".$fournisseur_un_id);
                            
                            // The repeater ( lot number et lot name )
                            $fournisseur_lot_row = [
                                'field_5b355be54fdb0'=>$data[1],
                                'field_5b35669a62aa6'=>$data[2]
                            ];
                            add_row( "field_5b35389e0257b", $fournisseur_lot_row, "user_".$fournisseur_un_id );

                            //update_field('field_5b352f739d167',$data[2],"user_".$fournisseur_un_id);
                            update_field('field_5b34fb74c676f',$data[3],"user_".$fournisseur_un_id);
                            update_field('field_5b35701456e2d',$data[4],"user_".$fournisseur_un_id);
                            update_field('field_5b34f7ed549e8',$data[6],"user_".$fournisseur_un_id);
                            update_field('field_5b353d8c0e99e',$data[7],"user_".$fournisseur_un_id);

                        }else{
                            error_log(print_r($fournisseur_un_id,TRUE));
                            $fournisseur_un_id = "";
                        }

                    }

                    // ========================================================================================

                    
                    // Le Fournisseur 2
                    $existing_user_deux = get_user_by( 'email', $data[10] );
                    error_log("existing_user_deux");
                    error_log(print_r($existing_user_deux,TRUE));
                    // Si le fournisseur existe 
                    $fournisseur_deux_id;
                    if( !empty( $existing_user_deux ) ){

                        // Mise à jour du fournisseur
                        $fournisseur_deux_id = $existing_user_deux->ID;

                        update_field('field_5b34f70d8d326',$data[0],"user_".$fournisseur_deux_id);
                        
                        // The repeater ( lot number et lot name )
                        // Vérifier si le lot existe déjà 
                        $lorrows = get_field('field_5b35389e0257b',"user_".$fournisseur_deux_id );
                        if($lorrows){

                            $supplier_lot_number_all = array_column($lorrows, 'supplier_lot_number');
                            error_log(print_r($supplier_lot_number_all,TRUE));

                            if( in_array( intval($data[1]) , $supplier_lot_number_all ) ){
                                // nothing
                            }else{
                                $fournisseur_lot_row = [
                                    'field_5b355be54fdb0'=>$data[1],
                                    'field_5b35669a62aa6'=>$data[2]
                                ];
                                add_row( "field_5b35389e0257b", $fournisseur_lot_row, "user_".$fournisseur_deux_id );
                            }
                        }
                        
                        //update_field('field_5b352f739d167',$data[2],"user_".$fournisseur_deux_id);
                        update_field('field_5b34fb74c676f',$data[8],"user_".$fournisseur_deux_id);
                        update_field('field_5b35701456e2d',$data[9],"user_".$fournisseur_deux_id);
                        update_field('field_5b34f7ed549e8',$data[11],"user_".$fournisseur_deux_id);
                        update_field('field_5b353d8c0e99e',$data[12],"user_".$fournisseur_deux_id);

                    }else{

                        // Création du fournisseur
                        $fournisseur_deux = array(
                            "user_login"=>explode("@", $data[10])[0],
                            "user_email"=>$data[10],
                            "user_pass"=>globalRandomPassword(),
                        );
                        $fournisseur_deux_id = wp_create_user($fournisseur_deux["user_login"], $fournisseur_deux["user_pass"], $fournisseur_deux["user_email"]);
                        
                        if( gettype($fournisseur_deux_id) == "integer" ){

                        // Update champs classiques du fournisseur
                        $fournisseur_deux_update = array(
                            "ID"=>$fournisseur_deux_id,
                            "role"=>"supplier"
                        );
                        wp_update_user($fournisseur_deux_update);

                        // Update ACF du fournisseur
                        update_field('field_5b34f70d8d326',$data[0],"user_".$fournisseur_deux_id);
                        
                        // The repeater ( lot number et lot name )
                        $fournisseur_lot_row = [
                            'field_5b355be54fdb0'=>$data[1],
                            'field_5b35669a62aa6'=>$data[2]
                        ];
                        add_row( "field_5b35389e0257b", $fournisseur_lot_row, "user_".$fournisseur_deux_id );
                        
                        //update_field('field_5b352f739d167',$data[2],"user_".$fournisseur_deux_id);
                        update_field('field_5b34fb74c676f',$data[8],"user_".$fournisseur_deux_id);
                        update_field('field_5b35701456e2d',$data[9],"user_".$fournisseur_deux_id);
                        update_field('field_5b34f7ed549e8',$data[11],"user_".$fournisseur_deux_id);
                        update_field('field_5b353d8c0e99e',$data[12],"user_".$fournisseur_deux_id);

                        }else{
                            error_log(print_r($fournisseur_deux_id,TRUE));
                            $fournisseur_deux_id = "";
                        }

                    }
                    

                    // ========================================================================================

                    
                    // Le Fournisseur 3
                    $existing_user_trois = get_user_by( 'email', $data[15] );
                    error_log("existing_user_trois");
                    error_log(print_r($existing_user_trois,TRUE));
                    // Si le fournisseur existe 
                    $fournisseur_trois_id;
                    if( !empty( $existing_user_trois ) ){

                        // Mise à jour du fournisseur
                        $fournisseur_trois_id = $existing_user_trois->ID;

                        update_field('field_5b34f70d8d326',$data[0],"user_".$fournisseur_trois_id);
                        
                        // The repeater ( lot number et lot name )
                        // Vérifier si le lot existe déjà 
                        $lorrows = get_field('field_5b35389e0257b',"user_".$fournisseur_trois_id );
                        if($lorrows){

                            $supplier_lot_number_all = array_column($lorrows, 'supplier_lot_number');
                            error_log(print_r($supplier_lot_number_all,TRUE));

                            if( in_array( intval($data[1]) , $supplier_lot_number_all ) ){
                                // nothing
                            }else{
                                $fournisseur_lot_row = [
                                    'field_5b355be54fdb0'=>$data[1],
                                    'field_5b35669a62aa6'=>$data[2]
                                ];
                                add_row( "field_5b35389e0257b", $fournisseur_lot_row, "user_".$fournisseur_trois_id );
                            }
                        }
                        
                        //update_field('field_5b352f739d167',$data[2],"user_".$fournisseur_deux_id);
                        update_field('field_5b34fb74c676f',$data[13],"user_".$fournisseur_trois_id);
                        update_field('field_5b35701456e2d',$data[14],"user_".$fournisseur_trois_id);
                        update_field('field_5b34f7ed549e8',$data[16],"user_".$fournisseur_trois_id);
                        update_field('field_5b353d8c0e99e',$data[17],"user_".$fournisseur_trois_id);

                    }else{

                        // Création du fournisseur
                        $fournisseur_trois = array(
                            "user_login"=>explode("@", $data[15])[0],
                            "user_email"=>$data[15],
                            "user_pass"=>globalRandomPassword(),
                        );
                        $fournisseur_trois_id = wp_create_user($fournisseur_trois["user_login"], $fournisseur_trois["user_pass"], $fournisseur_trois["user_email"]);
                        
                        if( gettype($fournisseur_trois_id) == "integer" ){

                        // Update champs classiques du fournisseur
                        $fournisseur_trois_update = array(
                            "ID"=>$fournisseur_trois_id,
                            "role"=>"supplier"
                        );
                        wp_update_user($fournisseur_trois_update);

                        // Update ACF du fournisseur
                        update_field('field_5b34f70d8d326',$data[0],"user_".$fournisseur_trois_id);
                        
                        // The repeater ( lot number et lot name )
                        $fournisseur_lot_row = [
                            'field_5b355be54fdb0'=>$data[1],
                            'field_5b35669a62aa6'=>$data[2]
                        ];
                        add_row( "field_5b35389e0257b", $fournisseur_lot_row, "user_".$fournisseur_trois_id );
                        
                        //update_field('field_5b352f739d167',$data[2],"user_".$fournisseur_deux_id);
                        update_field('field_5b34fb74c676f',$data[13],"user_".$fournisseur_trois_id);
                        update_field('field_5b35701456e2d',$data[14],"user_".$fournisseur_trois_id);
                        update_field('field_5b34f7ed549e8',$data[16],"user_".$fournisseur_trois_id);
                        update_field('field_5b353d8c0e99e',$data[17],"user_".$fournisseur_trois_id);

                        }else{
                            error_log(print_r($fournisseur_trois_id,TRUE));
                            $fournisseur_trois_id = "";
                        }
                    }   
                    
                    
                    // ========================================================================================

                    
                    error_log(print_r($data,TRUE));
                    
                    // Le name
                    $table_fournisseur_title = $data[0]."_".$data[1];
                    
                    // All the rows 
                    $table_fournisseur_rows = get_posts([
                        "numberposts"=>-1,
                        "post_type"=>"table_fournisseurs"
                    ]);

                    // Si Existe ou pas
                    if( !empty( $table_fournisseur_rows ) ){
                        //foreach($table_fournisseur_rows as $table_fournisseur_row){
                            $table_fournisseur_id = post_exists( $table_fournisseur_title );
                            //error_log("table_fournisseur_id");
                            //error_log($table_fournisseur_id);
                            if( $table_fournisseur_id == 0 ){
                                
                                // N'existe pas
                                error_log("N'existe pas");
                                $table_fournisseur_row_id = wp_insert_post([
                                    "post_type"=>"table_fournisseurs",
                                    "post_title"=>$table_fournisseur_title,
                                    "post_status"=>"publish"
                                ]);

                                update_field('field_5b35089984f21',$data[0],$table_fournisseur_row_id);
                                update_field('field_5b35087784f1f',$data[1],$table_fournisseur_row_id);
                                update_field('field_5b35088f84f20',$data[2],$table_fournisseur_row_id);
                                update_field('field_5b3507e5b1121',$fournisseur_un_id,$table_fournisseur_row_id);
                                update_field('field_5b350826b1122',$fournisseur_deux_id,$table_fournisseur_row_id);
                                update_field('field_5b350837b1123',$fournisseur_trois_id,$table_fournisseur_row_id);
        
                            }else{

                                // Existe
                                error_log("Existe");
                                update_field('field_5b35089984f21',$data[0],$table_fournisseur_id);
                                update_field('field_5b35087784f1f',$data[1],$table_fournisseur_id);
                                update_field('field_5b35088f84f20',$data[2],$table_fournisseur_id);
                                update_field('field_5b3507e5b1121',$fournisseur_un_id,$table_fournisseur_id);
                                update_field('field_5b350826b1122',$fournisseur_deux_id,$table_fournisseur_id);
                                update_field('field_5b350837b1123',$fournisseur_trois_id,$table_fournisseur_id);
        
                            }
                        //}
                    }else{

                        error_log("Il nya rien");

                        $table_fournisseur_row_id = wp_insert_post([
                            "post_type"=>"table_fournisseurs",
                            "post_title"=>$table_fournisseur_title,
                            "post_status"=>"publish"
                        ]);
                        update_field('field_5b35089984f21',$data[0],$table_fournisseur_row_id);
                        update_field('field_5b35087784f1f',$data[1],$table_fournisseur_row_id);
                        update_field('field_5b35088f84f20',$data[2],$table_fournisseur_row_id);
                        update_field('field_5b3507e5b1121',$fournisseur_un_id,$table_fournisseur_row_id);
                        update_field('field_5b350826b1122',$fournisseur_deux_id,$table_fournisseur_row_id);
                        update_field('field_5b350837b1123',$fournisseur_trois_id,$table_fournisseur_row_id);

                    }    
                    

                    $row++; 
                }else{
                    $row++; 
                }
            }
            fclose($handle);
        }
    } else {
        wp_send_json('senovea_ui_import_supplier_upload_errors');
    }

    /*
    error_log('new_suppliers');
    error_log(print_r($new_suppliers_array,TRUE));

    // Deleting existing supplier that are no longer in the document 
    $suppliers = get_users(['role' => 'supplier']);
    foreach( $suppliers as $supplier ){

        error_log(print_r($supplier, TRUE));
        if ( !in_array($supplier->data->user_email, $new_suppliers_array) ) {
            wp_delete_user($supplier->data->ID);
        }
        
    }
    */

    wp_send_json('senovea_ui_import_supplier_callback');

};
add_action( 'wp_ajax_senovea_ui_import_supplier_action', 'senovea_ui_import_supplier_callback', 10, 1);

function senovea_ui_import_arrondissement_callback(){

    // On supprime tout les champs existant
    $arrondissements = get_posts([
        "post_type"=>"table_arrondissement",
        "numberposts"=>-1
    ]);
    foreach( $arrondissements as $arrondissement ){
        error_log(print_r($arrondissement,TRUE));
        wp_delete_post($arrondissement->ID);
    }

    // On upload le CSV
    if (!function_exists('wp_handle_upload')) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }
    $uploadedfile = $_FILES['senovea_ui_import_arrondissement_file'];
    $upload_overrides = array('test_form' => false);
    $movefile = wp_handle_upload($uploadedfile, $upload_overrides);

    // On stock les num arrondissement
    //$arrondissement_array = array();

    // On parcours le CSV
    if ($movefile && !isset($movefile['error'])) {
        $row = 0;
        if (($handle = fopen($movefile['url'], "r")) !== FALSE) { 
            // On boucle tant qu'il y a des row
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                // on skip le header
                if( $row !== 0 ){
                    //array_push($arrondissement_array, $data[0]);
                    //error_log(print_r($data,TRUE));

                    // Pour chaque arrondissement on insert un nouveau post
                    $arrondissement = wp_insert_post([
                        "post_type"=>"table_arrondissement",
                        "post_title"=>$data[0],
                        "post_status"=>"publish"
                    ]);
                    update_field('field_5b3506b10ad9f',$data[0],$arrondissement);
                    update_field('field_5b3506ca0ada0',$data[1],$arrondissement);

                }
                $row++; 
            }
            fclose($handle);
        }
    }else{
        // Erreur le document n'existe pas
    }

    wp_send_json( 'senovea_ui_import_arrondissement_callback' );
}
add_action( 'wp_ajax_senovea_ui_import_arrondissement_action', 'senovea_ui_import_arrondissement_callback', 10, 1);


// Edit existing UI  
// * * * * * * * * * * * * * * * * * * * * * *

// Users.php columns
function senovea_custom_users_columns( $column ) {
    unset($column['posts']);

    $column['date'] = 'Date';
    $column['actions'] = 'Actions';

    //$column['invite'] = 'Invite';
    //$column['document'] = 'Document';
    //$column['associated_products'] = 'Prestations';

    return $column;
}
add_filter( 'manage_users_columns', 'senovea_custom_users_columns' );
// Users.php rows
function senovea_custom_users_rows( $val, $column_name, $user_id ){

    $udata = get_userdata($user_id);

    $customers_actions = array();

    $document_value = get_field('field_5b161ae42a8af', 'user_'.$user_id);
    $document_action;

    if( empty($document_value) ){

        $document_action = ' <p style="margin:0;padding:0px;color:#9E9E9E;text-align:left;" href="javascript:void(0)">No Document</p> ';
        array_push($customers_actions,' <p style="margin:0;padding:0px;color:#9E9E9E;text-align:left;" href="javascript:void(0)">No Document</p> ');
    
    }else{

        $document_action = ' <button type="button" class="button-secondary" title="validate_user"> <a target="_blank" href="'.$document_value['url'].'" style="color:#82878c;display:flex;align-items:center;justify-content:space-between;"> <span class="dashicons dashicons-media-document"></span> <span> View </span> </a> </button> ';
        array_push($customers_actions,' <button type="button" class="button-secondary" title="validate_user"> <a target="_blank" href="'.$document_value['url'].'" style="color:#82878c;display:flex;align-items:center;justify-content:space-between;"> <span class="dashicons dashicons-media-document"></span> <span> View </span> </a> </button> ');
    
    }

    $validation_value = get_field('field_5b154cc6d11d9', 'user_'.$user_id);
    $validation_action;

    if( empty($validation_value) ){

        $validation_action = ' <button data-uemail='.$udata->user_email.' data-uid='.$user_id.' type="button" class="button-primary senovea_mail_chimp_send_activation_mail_trigger" title="validate_user"> <a hre="href="javascript:void(0)" style="color:#FFF"> Send Invite </a> </button> ';
        array_push($customers_actions,' <button data-uemail='.$udata->user_email.' data-uid='.$user_id.' type="button" class="button-primary senovea_mail_chimp_send_activation_mail_trigger" title="validate_user"> <a hre="href="javascript:void(0)" style="color:#FFF"> Send Invite </a> </button> ');
    
    }else{

        $validation_action = ' <p style="margin:0;padding:0px;color:#7ad03a;text-align:left;font-weight:700;"> Invite sended </p>';
        array_push($customers_actions,' <p style="margin:0;padding:0px;color:#7ad03a;text-align:left;font-weight:700;"> Invite sended </p>');
    
    }

    $uregistered = strtotime($udata->user_registered);
    $uregisteredformat = date('d/m/Y \a\t g:ia',$uregistered);

    switch ($column_name) {
        case 'actions' :
            if( in_array("customer", $udata->roles) ){
                //return $validation_action;
                return join('<hr/>', $customers_actions);
            }elseif( in_array("supplier", $udata->roles) ){
                return '<span aria-hidden="true">—</span>';
            }else{
                return '<span aria-hidden="true">—</span>';
            }
            break;
        /*case 'document' :
            if( in_array("customer", $udata->roles) ){
                return $document_action;
            }else{
                return '<span aria-hidden="true">—</span>';
            }
            break;*/
        case 'date' :
            return $uregisteredformat;
            /*if( in_array("customer", $udata->roles) ){
                return $uregisteredformat;
            }else{
                return '<span aria-hidden="true">—</span>';
            }*/
            break;
        default:
            return $val;
            break;
    }
    return $val;

}
add_filter( 'manage_users_custom_column', 'senovea_custom_users_rows', 10, 3 );
// Users.php scripts load
function senovea_users_scripts( $hook ) { 

    // only for the users admin panel
    if ( $hook != 'users.php' ) {
        return;
    }

    // Set up the thickbox.
    wp_enqueue_style('thickbox');
    wp_enqueue_script('thickbox');

    // Queue up our own custom styles and scripts for managing the modal
    // and contents.
    wp_enqueue_style(
        'senovea-functions-css',
        plugin_dir_url(__FILE__) . 'css/senovea-functions.css'
    );
    wp_enqueue_script(
        'senovea-functions-js',
        plugin_dir_url(__FILE__) . 'js/senovea-functions.js',
        array(
        'jquery'
        )
    );

}
add_action( 'admin_enqueue_scripts', 'senovea_users_scripts', 10, 1 );
// Users.php AJAX Callback
function senovea_mail_chimp_send_activation_mail_callback (){
    $action = $_POST['action'];
    $uid    = $_POST['uid'];
    $send_customer_code_mailchimp_reponse = send_customer_code_mailchimp( $uid );
    // si pas d'érreur on change le champs ACF 
    /*update_field('field_5b154cc6d11d9',true,'user_'.$uid);*/
    // retour 
    wp_send_json( $send_customer_code_mailchimp_reponse );
};
add_action( 'wp_ajax_senovea_mail_chimp_send_activation_mail', 'senovea_mail_chimp_send_activation_mail_callback', 10, 1);

// Order admin panel
// On ajoute des statut de commande custom liés aux suppliers
// https://wordpress.stackexchange.com/questions/199289/how-to-create-a-custom-order-status-in-woocommerce
// https://rudrastyh.com/woocommerce/order-statuses.html
// https://www.sellwithwp.com/woocommerce-custom-order-status-2/
function register_my_new_order_statuses() {
    register_post_status( 'wc-waiting-first', array(
        'label'                     => 'Waiting first supplier actions',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'Waiting first supplier actions <span class="count">(%s)</span>', 'Waiting first supplier actions <span class="count">(%s)</span>' )
    ) );
    register_post_status( 'wc-accepted-first', array(
        'label'                     => 'First supplier accepted the order',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'First supplier accepted the order <span class="count">(%s)</span>', 'First supplier accepted the order <span class="count">(%s)</span>' )
    ) );
    register_post_status( 'wc-waiting-second', array(
        'label'                     => 'Waiting second supplier actions',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'Waiting second supplier actions <span class="count">(%s)</span>', 'Waiting second supplier actions <span class="count">(%s)</span>' )
    ) );
    register_post_status( 'wc-accepted-second', array(
        'label'                     => 'Second supplier accepted the order',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'Second supplier accepted the order <span class="count">(%s)</span>', 'Second supplier accepted the order <span class="count">(%s)</span>' )
    ) );
    register_post_status( 'wc-waiting-third', array(
        'label'                     => 'Waiting third supplier actions',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'Waiting third supplier actions <span class="count">(%s)</span>', 'Waiting third supplier actions <span class="count">(%s)</span>' )
    ) );
    register_post_status( 'wc-accepted-third', array(
        'label'                     => 'Third supplier accepted the order',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'Third supplier accepted the order <span class="count">(%s)</span>', 'Third supplier accepted the order <span class="count">(%s)</span>' )
    ) );
    register_post_status( 'wc-nobody', array(
        'label'                     => 'No supplier have accepted',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop( 'No supplier have accepted <span class="count">(%s)</span>', 'No supplier have accepted <span class="count">(%s)</span>' )
    ) );
}
add_action( 'init', 'register_my_new_order_statuses' );
function my_new_wc_order_statuses( $order_statuses ) {

    //unset($order_statuses['wc-pending']);
    //unset($order_statuses['wc-processing']);
    //unset($order_statuses['wc-on-hold']);
    //unset($order_statuses['wc-refunded']);
    //var_dump( $order_statuses );

    $order_statuses['wc-waiting-first'] = 'Waiting first supplier actions';
    $order_statuses['wc-waiting-second'] = 'Waiting second supplier actions';
    $order_statuses['wc-waiting-third'] = 'Waiting third supplier actions';

    $order_statuses['wc-accepted-first'] = 'First supplier accepted';
    $order_statuses['wc-accepted-second'] = 'Second supplier accepted';
    $order_statuses['wc-accepted-third'] = 'Third supplier accepted';

    $order_statuses['wc-nobody'] = 'No supplier have accepted';

    return $order_statuses;
}
add_filter( 'wc_order_statuses', 'my_new_wc_order_statuses' );


/* *
 * 5. SENOVEA EXISTING FUNCTIONNAL HOOKS
 * All the existing hooks we need to plug into for senovea
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Suppliers
// * * * * * * * * * * * * * * * * * * * * * *

// When supplier is created 
function user_register_callback($uid){

    error_log("user_register_callback");

    $newuser = get_user_by('id', $uid);
    $newuserrole = $newuser->roles;
    //error_log(print_r($newuser, TRUE));
    //error_log(print_r($newuserrole, TRUE));

    // If user === supplier
    if( $newuser->roles[0] == "supplier" ){
        // On inscrit le supplier à la mailchimp list
        //error_log("supplier");
        $add_supplier_mailchimp_response =  add_supplier_mailchimp($newuser->data, $newuser->data->user_pass);
        //error_log(print_r($add_supplier_mailchimp_response,TRUE));

    }else{
        return;
    }

}
add_action( 'user_register', 'user_register_callback', 10, 1);

function set_user_role_callback( $user_id, $role, $old_roles ){
    error_log('set_user_role_callback ');
    //error_log(print_r($role,TRUE));
    //error_log($role);
}
add_action( 'set_user_role', 'set_user_role_callback', 10, 3 );

// Products
// * * * * * * * * * * * * * * * * * * * * * *

/**
 *  Orders
 * * * * * * * * * * * * * * * * * * * * * */

// Quand il y a un order, on passe directement au statut custom ( waiting first supplier )
// https://stackoverflow.com/questions/45985488/set-woocommerce-order-status-when-order-is-created-from-processing-to-pending
// https://stackoverflow.com/questions/35686707/woocommerce-auto-complete-paid-orders-depending-on-payment-methods
// http://www.remicorson.com/change-the-orders-default-status-by-gateway-in-woocommerce/
// https://wordpress.stackexchange.com/questions/97176/get-product-id-from-order-id-in-woocommerce
// https://stackoverflow.com/questions/40711160/woocommerce-getting-the-order-item-price-and-quantity
/*function wc_auto_complete_paid_order( $order_id ) {
    error_log('woocommerce_thankyou');
}
add_action( 'woocommerce_thankyou', 'wc_auto_complete_paid_order', 20, 1 );
function action_woocommerce_new_order( $order_id ) {    
    error_log('woocommerce_new_order');
};       
add_action( 'woocommerce_new_order', 'action_woocommerce_new_order', 10, 1 ); 
function action_woocommerce_new_order_item_callback($item_id, $item, $order_id){
    error_log('woocommerce_new_order_item');
}
add_action( 'woocommerce_new_order_item', 'action_woocommerce_new_order_item_callback', 10, 3 );*/

function wp_insert_post_callback( $post_id, $post, $update ){

    error_log("wp_insert_post");

    // Vérification du type de post
    $thePost = get_post($post_id);
    $thePostType = $thePost->post_type;

    /*

    // Si il s'agit d'une order
    if( $thePostType == "shop_order" ){

        // Order Object
        $order_id = $post_id;
        $order = wc_get_order( $order_id );

        //error_log("theOrder");
        //error_log($order);

        // Customer associated
        $customer_id = $order->get_user_id();

        // Vérification de l'existence d'un produit
        if( !empty($order->get_items()) ){

            // Si l'order est on hold
            // error_log($order->get_status());
            if( $order->get_status() != "on-hold" )
                return;

            // Product Associated
            $product_ids = array();
            $product_skus = array();
            foreach ($order->get_items() as $item_id => $item_data) {
                // Get an instance of corresponding the WC_Product object
                $product = $item_data->get_product();
                $product_id = $product->get_id(); // Get the product name    
                $product_name = $product->get_name(); // Get the product name   
                $product_sku = $product->get_sku(); // Get the product SKU   

                // Vérification du produit ( si variation ou pas )
                $theProduct = get_post($product_id);

                //error_log('thePost');
                //error_log(print_r($theProduct,TRUE));

                if( $theProduct->post_type == "product_variation" ){
                    array_push( $product_ids, $theProduct->post_parent );
                }else{
                    array_push( $product_ids, $theProduct->ID );
                }
                array_push( $product_skus, $product_sku );
            }
            $product_id = $product_ids[0];
            $product_sku = $product_skus[0];

            error_log(print_r($product_ids,TRUE));
            error_log(print_r($product_skus,TRUE));

            
            // Créer les bons paniers en lien avec la commande

            // Changement pour cette partie la
            // ================================================================================

            // Suppliers associated with position
            
            $suppliers = get_users([
                "role"=>"supplier"
            ]);

            $suppliers_positions = array();
            foreach( $suppliers as $supplier ){
                // Boucle sur la rel
                $rel_supp_prod = get_posts([
                    'numberposts' => -1,
                    'post_type'   => 'rel_supp_products'
                ]);
                foreach( $rel_supp_prod as $rel ){

                    //field_5b2fa5dbe1d3f -> supplier
                    $rel_supplier_id = get_field('field_5b2fa5dbe1d3f', $rel->ID);
                    //field_5b2fa611e1d40 -> product
                    $rel_product_id = get_field('field_5b2fa611e1d40', $rel->ID);

                    if( intval($rel_supplier_id['ID']) == intval($supplier->ID) && intval($rel_product_id->ID) == intval($product_id) ){                                       
                        $position = get_field('field_5b2fa64be1d41', $rel->ID);
                        switch(intval($position)){
                            case 1:
                                $suppliers_positions['first_supplier'] = $supplier->ID;
                                break;
                            case 2:
                                $suppliers_positions['second_supplier'] = $supplier->ID;
                                break;
                            case 3:
                                $suppliers_positions['third_supplier'] = $supplier->ID;
                                break;
                            default:
                                break;
                        }   
                    }
                }
            }
            
            // ================================================================================

            //error_log(print_r($suppliers_positions, TRUE));


            // Associer l'Order avec les suppliers, le customer et le produit

            //Supplier
            foreach( $suppliers_positions as $suppliers_position_key => $suppliers_position_value ){

                $supplier_existing_order = get_field('field_5b26e02560692', "user_".$suppliers_position_value);
                $supplier_orders_ids_array = array();
                if(!empty($supplier_existing_order)){
                    foreach($supplier_existing_order as $supplier_existing_order_value){
                        array_push($supplier_orders_ids_array, $supplier_existing_order_value->ID);
                    }
                }
                array_push($supplier_orders_ids_array, $order_id);
                update_field('field_5b26e02560692',$supplier_orders_ids_array, "user_".$suppliers_position_value);

            }

            // Product
            $product_orders = get_field('field_5b27e042035f0', $product_id);
            //error_log( print_r($product_orders, TRUE) );
            $product_orders_ids = array();
            if(!empty($product_orders)){
                foreach($product_orders as $product_orders_value){
                    array_push($product_orders_ids, $product_orders_value->ID);
                }
            }
            array_push($product_orders_ids, $order_id);
            //error_log( print_r($product_orders_ids, TRUE) );
            update_field('field_5b27e042035f0',$product_orders_ids, $product_id);

            // Customer
            $customer_orders = get_field('field_5b26fb9963805', "user_".$customer_id);
            $customer_orders_ids = array();
            if(!empty($customer_orders)){
                foreach($customer_orders as $customer_orders_value){
                    array_push($customer_orders_ids, $customer_orders_value->ID);
                }
            }
            array_push($customer_orders_ids, $order_id);
            //error_log( print_r($customer_orders_ids, TRUE) );
            update_field('field_5b26fb9963805',$customer_orders_ids, "user_".$customer_id);

            // On passe directement au statut "waiting first supplier"
            $order->update_status( 'wc-waiting-first' );

        }else{
            error_log('noproduct');
        }
    }

    */

}
add_action( 'wp_insert_post', 'wp_insert_post_callback', 10, 3 );

/*function save_post_callback( $post_id ){
    error_log("save_post");
    error_log($post_id);
}
add_action( 'save_post_shop_order', 'save_post_callback' );*/

// Quand order change de statut on trigger des mails
// https://gist.github.com/abegit/74e691d877cadc37d7b6
// https://stackoverflow.com/questions/43716196/send-an-email-notification-when-custom-order-status-changes-in-woocommerce?rq=1
// https://wordpress.stackexchange.com/questions/258437/woocommerce-change-order-status-from-on-hold-to-pending-payment

//https://stackoverflow.com/questions/44562589/mailchimp-automation-send-same-email-multiple-time
function woocommerce_order_status_changed_mailing( $order_id, $from_status, $to_status, $order ) {

    error_log('woocommerce_order_status_changed_mailing');
    
    // Customer ID
    $customer_id = $order->get_user_id();

    // Product ID

        // Vérification de l'existence d'un produit
        if( !empty($order->get_items()) ){

            // Product Associated
            $product_ids = array();
            $product_skus = array();
            $product_qty_ids = array();

            foreach ($order->get_items() as $item_id => $item_data) {
                //error_log( print_r($item_data,TRUE) );
                //error_log( $item_data->get_quantity() );

                // Get an instance of corresponding the WC_Product object
                $product = $item_data->get_product();
                
                //error_log( print_r($product,TRUE) );

                $product_id = $product->get_id(); // Get the product name    
                $product_name = $product->get_name(); // Get the product name   
                $product_sku = $product->get_sku(); // Get the product SKU   

                // Vérification du produit ( si variation ou pas )
                $theProduct = get_post($product_id);

                //if( $theProduct->post_type == "product_variation" ){
                //    array_push( $product_ids, $theProduct->post_parent );
                //}else{
                //    array_push( $product_ids, $theProduct->ID );
                //}

                $product_qty_ids[$theProduct->ID] = $item_data->get_quantity();

                array_push( $product_ids, $theProduct->ID );
                array_push( $product_skus, $product_sku );
            }

            //error_log(print_r( $product_qty_ids , TRUE));

            // Suppliers ID and position 

            $fournisseur_r1 = get_field('field_5b26fa0bd28f7', $order_id);
            $fournisseur_r2 = get_field('field_5b26fa45005e3', $order_id);
            $fournisseur_r3 = get_field('field_5b26fa56005e4', $order_id);

                // Quand on passe au statut ( waiting first supplier )
                // ... envoie d'un mail au first supplier 
                // Quand on passe au statut ( waiting second supplier )
                // ... envoie d'un mail au second supplier 
                // Quand on passe au statut ( waiting third supplier )
                // ... envoie d'un mail au third supplier 

                // Quand personne n'a rep -> failed
                // ... envoie d'un mail failed au customer

                // Quand qq'un a rep -> success
                // ... envoie d'un mail success au customer

            
            // c'est ici qu'on update le panier //

            switch( $to_status ){

                case "waiting-first":
                    error_log('waiting-first');
                    error_log('fournisseur R1');
                    error_log(print_r($fournisseur_r1,TRUE));
                    $send_supplier_order_response = send_supplier_order( $fournisseur_r1['ID'] , $order_id, $product_qty_ids, $customer_id );
                    error_log(print_r($send_supplier_order_response,TRUE));
                    break;
                case "waiting-second":
                    error_log('waiting-second');
                    error_log('fournisseur R2');
                    error_log(print_r($fournisseur_r2,TRUE));
                    $send_supplier_order_response = send_supplier_order( $fournisseur_r2['ID'] , $order_id, $product_qty_ids, $customer_id );
                    //error_log(print_r($send_supplier_order_response,TRUE));
                    break;                
                case "waiting-third":
                    error_log('waiting-third');
                    error_log('fournisseur R3');
                    error_log(print_r($fournisseur_r3,TRUE));
                    $send_supplier_order_response = send_supplier_order( $fournisseur_r3['ID'] , $order_id, $product_qty_ids, $customer_id );
                    error_log(print_r($send_supplier_order_response,TRUE));
                    break;
                case "accepted-first":
                    error_log('accepted-first');
                    break;
                case "accepted-second":
                    error_log('accepted-second');
                    break;
                case "accepted-third":
                    error_log('accepted-third');
                    break;
                case "nobody":
                    error_log('nobody');
                    break;
                default:
                    break;

            }


            /*$suppliers = get_users([
                "role"=>"supplier"
            ]);

            $suppliers_positions = array();
            foreach( $suppliers as $supplier ){
                // Boucle sur la rel
                $rel_supp_prod = get_posts([
                    'numberposts' => -1,
                    'post_type'   => 'rel_supp_products'
                ]);
                foreach( $rel_supp_prod as $rel ){

                    //field_5b2fa5dbe1d3f -> supplier
                    $rel_supplier_id = get_field('field_5b2fa5dbe1d3f', $rel->ID);
                    //field_5b2fa611e1d40 -> product
                    $rel_product_id = get_field('field_5b2fa611e1d40', $rel->ID);

                    if( intval($rel_supplier_id['ID']) == intval($supplier->ID) && intval($rel_product_id->ID) == intval($product_id) ){                                       
                        $position = get_field('field_5b2fa64be1d41', $rel->ID);
                        switch(intval($position)){
                            case 1:
                                $suppliers_positions['first_supplier'] = $supplier->ID;
                                break;
                            case 2:
                                $suppliers_positions['second_supplier'] = $supplier->ID;
                                break;
                            case 3:
                                $suppliers_positions['third_supplier'] = $supplier->ID;
                                break;
                            default:
                                break;
                        }   
                    }
                }
            }*/

            //error_log(print_r($suppliers_positions,TRUE));

        }else{

            //error_log("no product");

        }
}
add_action('woocommerce_order_status_changed', 'woocommerce_order_status_changed_mailing', 10, 4);

// Cron task qui vérifie tout les jours et qui change le statut
// https://kinsta.com/knowledgebase/wordpress-cron-job/#
// https://www.elegantthemes.com/blog/tips-tricks/how-to-add-cron-jobs-to-wordpress
// https://developer.wordpress.org/plugins/cron/scheduling-wp-cron-events/
// https://tommcfarlin.com/wordpress-cron-jobs/
// https://wordpress.org/plugins/wp-crontrol/
function senovea_orders_custom_cron_callback(){
    error_log('senovea_orders_custom_cron_callback');
}
add_action( 'senovea_orders_custom_cron', 'senovea_orders_custom_cron_callback' );