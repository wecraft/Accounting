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
            $table->integer('account1_id')->nullable();
            $table->integer('account2_id')->nullable();
            $table->decimal('amount');
            $table->integer('currency_id')->nullable();
            $table->timestamps();

            $table->foreign('account1_id')
                ->references('id')
                ->on('accounts')
                ->onDelete('set null');

            $table->foreign('account2_id')
                ->references('id')
                ->on('accounts')
                ->onDelete('set null');

            $table->foreign('currency_id')
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
