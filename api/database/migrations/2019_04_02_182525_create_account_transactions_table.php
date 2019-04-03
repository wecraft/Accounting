<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('account1_id')->unsigned()->nullable();
            $table->integer('account2_id')->unsigned()->nullable();
            $table->decimal('amount1');
            $table->decimal('amount2');
            $table->integer('currency1_id')->unsigned()->nullable();
            $table->integer('currency2_id')->unsigned()->nullable();
            $table->date('date');
            $table->integer('model_id');
            $table->timestamps();

            $table->foreign('account1_id')
                ->references('id')
                ->on('accounts')
                ->onDelete('set null');

            $table->foreign('account2_id')
                ->references('id')
                ->on('accounts')
                ->onDelete('set null');

            $table->foreign('currency1_id')
                ->references('id')
                ->on('currencies')
                ->onDelete('set null');
            $table->foreign('currency2_id')
                ->references('id')
                ->on('currencies')
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
        Schema::dropIfExists('account_transactions');
    }
}
