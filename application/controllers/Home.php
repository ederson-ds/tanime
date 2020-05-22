<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    public function index() {

        $data['pages'] = [
            0 => array(0 => 'Financeiro',
                'subpages' => array(0 => array('name' => 'Contas a pagar', 'urlName' => 'contasapagar'),
                    1 => array('name' => 'Contas a receber', 'urlName' => 'contasareceber'))
            )
        ];

        $this->load->view('home/home', $data);
    }

}
