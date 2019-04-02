<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user1_id')->nullable();
            $table->integer('user2_id')->nullable();
            $table->decimal('amount');
            $table->integer('currency_id')->nullable();
            $table->timestamps();

            $table->foreign('user1_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('user2_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('user_transactions');
    }
}
