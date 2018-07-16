<?php

/*

    Plugin Name: Senovea WooCommerce 
    Description: WooCommerce Senovea custom plugin
    Author: Brauperle
    Version: 1.0.0

    Copyright: © 2012 Senovea Corp (email : developer@senovea.com)
    License: GNU General Public License v3.0
    License URI: http://www.gnu.org/licenses/gpl-3.0.html

*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// require / uses 
require __DIR__ . '/vendor/autoload.php';
use Automattic\WooCommerce\Client;

function woocommerce_api(){
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

// routes 
add_action( 'rest_api_init', 'register_rest_products_routes');
function register_rest_products_routes(){
	// test
    // route test
    register_rest_route('senovea/v1', 'prout', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_test'
    ));
	// orders
    // route all orders
    register_rest_route('senovea/v1', 'orders', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_get_orders'
    ));
    // products
    // route all products
    register_rest_route('senovea/v1', 'products', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_get_products'
	));
	// suppliers
	// route get supplier 
	register_rest_route('senovea/v1', 'supplier/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_get_supplier',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
	));
	// route supplier accept 
	register_rest_route('senovea/v1', 'supplier/accept', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_post_supplier_accept'
	));
	// route supplier reject 
	register_rest_route('senovea/v1', 'supplier/reject', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_post_supplier_reject'
    ));
    // customers
    // route get customer
    register_rest_route('senovea/v1', 'customer/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'senovea_woocommerce_proxy_get_customer',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
    ));
    // route update customer
    register_rest_route('senovea/v1', 'customer/update/(?P<id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_update_customer',
        'args' => array(
            'id' => array(
              'validate_callback' => function($param, $request, $key) {
                return is_numeric( $param );
              }
            )
        )
    ));
    // route create customer
    register_rest_route('senovea/v1', 'customer', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_post_customer',
	));
	// route customer place an order 
	register_rest_route('senovea/v1', 'customer/order', array(
        'methods' => 'POST',
        'callback' => 'senovea_woocommerce_proxy_post_customer_order',
    ));
}

// callbacks
// callback test 
function senovea_woocommerce_proxy_test( WP_REST_Request $request ){
	$field = get_field('field_5b23b687d59c0', 167);
	return new WP_REST_Response($field, 200);
}
// callback all order
function senovea_woocommerce_proxy_get_orders( WP_REST_Request $request ){
	$orders = woocommerce_api()->get('orders');
	$reponse = array();
	$reponse['user_orders'] = $orders;
	return new WP_REST_Response($reponse, 200);
}
// callback all products
function senovea_woocommerce_proxy_get_products( WP_REST_Request $request ){  
    $products = woocommerce_api()->get('products');
    return new WP_REST_Response($products, 200);
}
// callback all supplier
function senovea_woocommerce_proxy_get_supplier( WP_REST_Request $request ){

	$response = array();
	$parameters = $request->get_params();

	// on récupère le supplier id 
	$uid = $parameters['id'];
	$response['uid'] = $uid;

	// on récupère le supplier 
	$thatsupplier = get_user_by('id', $uid);
	$response['user_informations'] = $thatsupplier;
	$thatsuppliermeta = get_user_meta($uid);
	$response['user_meta'] = $thatsuppliermeta;

	// on récupère les orders du supplier 
	$thatsupplier_associated_orders = get_field('field_5b26e02560692',"user_".$uid);
	//$thatsupplier_associated_products = get_field('field_5b27df76266f2',"user_".$uid);
	$response['user_associated_orders'] = $thatsupplier_associated_orders;
	//$response['user_associated_products'] = $thatsupplier_associated_products;

	$orders_details = array();
	foreach( $thatsupplier_associated_orders as $thatsupplier_associated_orders_key => $thatsupplier_associated_orders_value ){
		array_push($orders_details, woocommerce_api()->get('orders/'.$thatsupplier_associated_orders_value->ID));
	}
	$response['user_orders_details'] = $orders_details;

	$orders_products_details = array();
	// on récupère les products de ces orders
	foreach( $orders_details as $orders_details_key => $orders_details_value ){
		array_push($orders_products_details, woocommerce_api()->get('products/'.$orders_details_value->line_items[0]->product_id));
	}
	$response['user_orders_products_details'] = $orders_products_details;

	$supplier_positions = array();
	foreach( $orders_products_details as $orders_products_details_key => $orders_products_details_value ){
		foreach( $orders_products_details_value->acf as $orders_products_details_value_acf_key => $orders_products_details_value_acf_value ){
			if( $orders_products_details_value_acf_key == 'product_associated_first_supplier' || $orders_products_details_value_acf_key == 'product_associated_second_supplier' || $orders_products_details_value_acf_key == 'product_associated_third_supplier' ){
				// on fait le tour des champs ACF ( first / second / third )
				if( $orders_products_details_value_acf_value != "" ){
					if( $orders_products_details_value_acf_value->ID == $uid ){
						// le bon supplier 
						$supplier_positions[$orders_products_details_value->id] = $orders_products_details_value_acf_key;
					}
				}
			}	
		}
	}
	$response['supplier_positions'] = $supplier_positions;

	// on récupère le statut actuel de l'offre
	$supplier_orders_actives = array();
	$supplier_orders_winned = array();
	$supplier_orders_failed = array();

	foreach( $orders_details as $orders_details_key => $orders_details_value ){
		foreach( $supplier_positions as $supplier_positions_key => $supplier_positions_value ){

			if( $orders_details_value->line_items[0]->product_id == $supplier_positions_key ){
				// la bonne order 
				if( $supplier_positions_value == "product_associated_first_supplier" ){
					switch( $orders_details_value->status ){
						case 'waiting-first':
							array_push( $supplier_orders_actives, $orders_details_value );
						break;
						case 'waiting-second':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'waiting-third':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'accepted-first':
							array_push( $supplier_orders_winned, $orders_details_value );
						break;
						case 'accepted-second':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'accepted-third':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'nobody':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						default:
						break;
					}
				}
				if( $supplier_positions_value == "product_associated_second_supplier" ){
					switch( $orders_details_value->status ){
						case 'waiting-first':
							// wait
							//array_push( $supplier_orders_actives, $orders_details_value );
						break;
						case 'waiting-second':
							array_push( $supplier_orders_actives, $orders_details_value );
						break;
						case 'waiting-third':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'accepted-first':
							//nothin
							//array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'accepted-second':
							array_push( $supplier_orders_winned, $orders_details_value );
						break;
						case 'accepted-third':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'nobody':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						default:
						break;
					}
				}
				if( $supplier_positions_value == "product_associated_third_supplier" ){
					switch( $orders_details_value->status ){
						case 'waiting-first':
							// wait
							//array_push( $supplier_orders_actives, $orders_details_value );
						break;
						case 'waiting-second':
							//wait
							//array_push( $supplier_orders_actives, $orders_details_value );
						break;
						case 'waiting-third':
							array_push( $supplier_orders_actives, $orders_details_value );
						break;
						case 'accepted-first':
							//nothin
							//array_push( $supplier_orders_failed, $orders_details_value );
						break;
						case 'accepted-second':
							//nothin
							//array_push( $supplier_orders_winned, $orders_details_value );
						break;
						case 'accepted-third':
							array_push( $supplier_orders_winned, $orders_details_value );
						break;
						case 'nobody':
							array_push( $supplier_orders_failed, $orders_details_value );
						break;
						default:
						break;
					}
				}
				
			}
		}
	}

	$response['supplier_orders_actives'] = $supplier_orders_actives;
	$response['supplier_orders_winned'] = $supplier_orders_winned;
	$response['supplier_orders_failed'] = $supplier_orders_failed;

	// on renvoit les commandes actives et passées au supplier 
	return new WP_REST_Response($response , 200);

}

// callback accept order
function senovea_woocommerce_proxy_post_supplier_accept( WP_REST_Request $request ){

	$parameters = $request->get_params();
	$reponse['parameters'] = $parameters;

	// on récupère user 
	$supplier_id = intval($parameters['supplier_id']);

	// on récupère l'order
	$order_id = intval($parameters['order_id']);
	$order = woocommerce_api()->get('orders/'.$order_id);
	$reponse['order'] = $order;

	// on récupère le product de l'order
	$product_id = $order->line_items[0]->product_id;
	$product = woocommerce_api()->get('products/'.$product_id);
	$reponse['product'] = $product;

	// on récupère les champs ACF ( first supplier / second supplier / third supplier )
	$supplier_position = '';
	$reponse['supplier_position'] = '';
	foreach ( $product->acf as $key_acf => $value_acf ){
		if( $key_acf == 'product_associated_first_supplier' || $key_acf == 'product_associated_second_supplier' || $key_acf == 'product_associated_third_supplier' ){
			if( $value_acf != "" ){

				// si le supplier ID === ACF supplier ID 
				if( $supplier_id == $value_acf->ID ){
					// on define la place du supplier ( premier / second / third )
					$supplier_position = $key_acf;
					$reponse['supplier_position'] = $supplier_position;
				}

			}
		}
	}

	$order_new_status = array();
	// on bloque la commande sur " completed - place sur supplier "
	switch ( $supplier_position ) {
		case 'product_associated_first_supplier':
			$order_new_status = ['status' => 'accepted-first'];
			woocommerce_api()->put('orders/'.$order_id, $order_new_status);
		break;
		case 'product_associated_second_supplier':
			$order_new_status = ['status' => 'accepted-second'];
			woocommerce_api()->put('orders/'.$order_id, $order_new_status);
		break;
		case 'product_associated_third_supplier':
			$order_new_status = ['status' => 'accepted-third'];
			woocommerce_api()->put('orders/'.$order_id, $order_new_status);
		break;
		default:
		break;
	}
	$reponse['order_new_status'] = $order_new_status;

	return new WP_REST_Response($reponse, 200);

}
// callback reject order
function senovea_woocommerce_proxy_post_supplier_reject( WP_REST_Request $request ){
	
	$parameters = $request->get_params();
	$reponse['parameters'] = $parameters;

	$parameters = $request->get_params();
	$reponse['parameters'] = $parameters;

	// on récupère user 
	$supplier_id = intval($parameters['supplier_id']);

	// on récupère l'order
	$order_id = intval($parameters['order_id']);
	$order = woocommerce_api()->get('orders/'.$order_id);
	$reponse['order'] = $order;

	// on récupère le product de l'order
	$product_id = $order->line_items[0]->product_id;
	$product = woocommerce_api()->get('products/'.$product_id);
	$reponse['product'] = $product;

	// on récupère les champs ACF ( first supplier / second supplier / third supplier )
	$supplier_position = '';
	$reponse['supplier_position'] = '';
	foreach ( $product->acf as $key_acf => $value_acf ){
		if( $key_acf == 'product_associated_first_supplier' || $key_acf == 'product_associated_second_supplier' || $key_acf == 'product_associated_third_supplier' ){
			if( $value_acf != "" ){

				// si le supplier ID === ACF supplier ID 
				if( $supplier_id == $value_acf->ID ){
					// on define la place du supplier ( premier / second / third )
					$supplier_position = $key_acf;
					$reponse['supplier_position'] = $supplier_position;
				}

			}
		}
	}

	// on bloque la commande sur " waiting - place de l'autre supplier "
	$order_new_status = array();
	// on bloque la commande sur " completed - place sur supplier "
	switch ( $supplier_position ) {
		case 'product_associated_first_supplier':
			$order_new_status = ['status' => 'waiting-second'];
			woocommerce_api()->put('orders/'.$order_id, $order_new_status);
		break;
		case 'product_associated_second_supplier':
			$order_new_status = ['status' => 'waiting-third'];
			woocommerce_api()->put('orders/'.$order_id, $order_new_status);
		break;
		case 'product_associated_third_supplier':
			$order_new_status = ['status' => 'nobody'];
			woocommerce_api()->put('orders/'.$order_id, $order_new_status);
		break;
		default:
		break;
	}
	$reponse['order_new_status'] = $order_new_status;

	return new WP_REST_Response($reponse, 200);
}
// callback get customer
function senovea_woocommerce_proxy_get_customer( WP_REST_Request $request ){
	$uid = $request->get_param( 'id' );
	$customer = woocommerce_api()->get( 'customers/'.$uid );
    return new WP_REST_Response($customer, 200);
}
// callback post customer
function senovea_woocommerce_proxy_post_customer( WP_REST_Request $request ){

	// get payload 
	$response 	= array();
	$files  	= $request->get_file_params();
	$parameters = $request->get_params();
	$username 	= sanitize_text_field($parameters['username']);
	$email 		= sanitize_text_field($parameters['email']);
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
					'first_name' => '',
					'last_name' => '',
					'username' => $username, // required
					'password' => $password,
					'billing' => [
						'first_name' => '',
						'last_name' => '',
						'company' => '',
						'address_1' => '',
						'address_2' => '',
						'city' => '',
						'state' => '',
						'postcode' => '',
						'country' => '',
						'email' => $email, // required
						'phone' => ''
					],
					'shipping' => [
						'first_name' => '',
						'last_name' => '',
						'company' => '',
						'address_1' => '',
						'address_2' => '',
						'city' => '',
						'state' => '',
						'postcode' => '',
						'country' => ''
					]
				];
				$customer = woocommerce_api()->post('customers', $data);

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
				 * 	add customer to mailchim member list
				 */
				// begin add customer to mailchimp list
				/*$mail_chimp_api_data = array(
					"id" => strval($customer->id),
					"email_address" => $customer->email,
					"opt_in_status" => true,
					"company" => "",
					"first_name" => "",
					"last_name" => "",
					"orders_count" => 0,
					"total_spent" => "0",
					"address" => array(
						"address1" => "",
						"address2" => "",
						"city" => "",
						"province" => "",
						"province_code" => "",
						"postal_code" => "",
						"country" => "",
						"country_code" => ""
					)
				);
				$mail_chimp_api_data_string = json_encode($mail_chimp_api_data);
			
				$curl = curl_init();

				curl_setopt_array($curl, array(
					CURLOPT_URL => "https://us16.api.mailchimp.com/3.0/ecommerce/stores/5b224f3eb2ac3/customers",
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => "",
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 30,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => "POST",
					//CURLOPT_POSTFIELDS => "{\"id\" : \"cust0003\", \"email_address\" : \"freddie@freddiesjokesbisbis.com\", \"opt_in_status\" : true, \"company\" : \"MailChimp\", \"first_name\" : \"Freddie\", \"last_name\" : \"Von Chimpenheimer\", \"orders_count\" : 1, \"total_spent\" : 10.25, \"address\" : {\"address1\" : \"675 Ponce de Leon Ave NE\", \"address2\" : \"Suite 5000\", \"city\" : \"Atlanta\", \"province\" : \"GA\", \"province_code\" : \"30033\", \"country_code\" : \"\"}}",
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
				curl_close($curl);*/
				// end add customer to mailchimp list

				$mail_chimp_api_data = array(

					"email_address" => $customer->email,
					"status" => "subscribed",
					"merge_fields" => array(
						"UFOREIGNID" => strval($customer->id),
						"UCODE" => $password,
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


				/**
				 * 	build response
				 */

				$response['code'] = 200;
				$response['message'] = $customer;
				$response['curlmailchimp'] = ['curl_err'=>$err,'curl_data'=>$curl_response_json_decode];

			}else{
				$error->add(406, __("Username already exists, please find another username", 'wp-rest-user'), array('status' => 400));
				return $error;
			}
		}else{
			$error->add(406, __("Email already exists, please try 'Reset Password'", 'wp-rest-user'), array('status' => 400));
			return $error;
		}
		
	return new WP_REST_Response($response, 200);

}
// callback upate customer
function senovea_woocommerce_proxy_update_customer( WP_REST_Request $request ){
	$uid = $request->get_param( 'id' );
	$email = $request->get_param( 'email' );
	$data = [
		"email" => $email
	];
	$customer = woocommerce_api()->put( 'customers/'.$uid, $data );
	return new WP_REST_Response($customer, 200);    
}
// callback customer place an order 
function senovea_woocommerce_proxy_post_customer_order( WP_REST_Request $request ){

	$response = array();
	$parameters = $request->get_params();
	$response['parameters'] = $parameters;
	$customer_id = $parameters['customer_id'];
	$product_id = $parameters['product_id'];

	
	$new_order = [
		"customer_id" => $customer_id,
		"payment_method"=> "cheque",
		"payment_method_title"=> "Check payments",
		//'set_paid' => true,
		/*'billing' => [
			'first_name' => '',
			'last_name' => '',
			'address_1' => '',
			'address_2' => '',
			'city' => '',
			'state' => '',
			'postcode' => '',
			'country' => '',
			'email' => 'john.doe@example.com',
			'phone' => '(555) 555-5555'
		],
		'shipping' => [
			'first_name' => 'John',
			'last_name' => 'Doe',
			'address_1' => '969 Market',
			'address_2' => '',
			'city' => 'San Francisco',
			'state' => 'CA',
			'postcode' => '94103',
			'country' => 'US'
		],*/
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

	return new WP_REST_Response($response, 200);   
}