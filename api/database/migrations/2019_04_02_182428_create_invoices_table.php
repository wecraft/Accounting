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
            $table->integer('currency_id')->unsigned()->nullable();
            $table->integer('account_id')->unsigned()->nullable();
            $table->integer('project_id')->unsigned()->nullable();
            $table->text('meta');
            $table->boolean('advance');
            $table->boolean('proforma');
            $table->date('issue_date');
            $table->date('pmt_date')->nullable();
            $table->date('adv_pmt_date')->nullable();
            $table->integer('model_id');
            $table->timestamps();

            $table->foreign('currency_id')
                ->references('id')
                ->on('currencies')
                ->onDelete('set null');

            $table->foreign('account_id')
                ->references('id')
                ->on('accounts')
                ->onDelete('set null');

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
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
