<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('prefix');
            $table->string('lang');
            $table->integer('number');
            $table->integer('currency_id')->nullable();
            $table->integer('account_id')->nullable();
            $table->integer('client_id')->nullable();
            $table->text('meta');
            $table->boolean('advance');
            $table->boolean('proforma');
            $table->date('issue_date');
            $table->date('pmt_date');
            $table->date('adv_pmt_date');
            $table->timestamps();

            $table->foreign('currency_id')
                ->references('id')
                ->on('currencies')
                ->onDelete('set null');

            $table->foreign('account_id')
                ->references('id')
                ->on('accounts')
                ->onDelete('set null');

            $table->foreign('client_id')
                ->references('id')
                ->on('clients')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
